from flask import Flask,jsonify,request
import pymongo
import json
from flask_cors import CORS
from datetime import datetime
import hashlib as h
from datetime import date, timedelta

app = Flask(__name__)

CORS(app)
MONGO_HOST = "127.0.0.1"
MONGO_PORT = 27017
MONGO_DB = "test_database"
MONGO_USER = "deva"
MONGO_PASS = "pragati@123"

CORS(app, resources={r"/*": {"origins": "*"}})

con = pymongo.MongoClient(MONGO_HOST, MONGO_PORT)
db = con[MONGO_DB]

currentSchedule = db.currentSchedule
defaultSchedule = db.defaultSchedule
logDetails = db.logDetails
holidayData = db.holidayData
longBells = db.longBells
userInfo = db.userInfo

def getListFromCollection(mylist):
    stringList = list(map(lambda x: x["time"],mylist))
    return stringList

def getReasonFromCollection(mylist):
    stringList = list(map(lambda x: x["reason"],mylist))
    return stringList

def getHolidayFromCollection(mylist):
    holidayList = list(map(lambda x: x["Date"],mylist))
    return holidayList
    
def removeBellsAfter(time,currentScheduleList):
    for bellTime in currentScheduleList:
        if bellTime > time:
            currentSchedule.remove({"time":bellTime})
            
def bytesToJson(byteVal):
    strVal = byteVal.decode("utf-8").replace("'",'"')
    jsonVal = json.loads(strVal)
    return jsonVal
def getUserInfo(mylist):
    userList = list(map(lambda x: x["username"],mylist))
    passwordList = list(map(lambda x: x["password"],mylist))
    return userList,passwordList

@app.route("/login", methods=['POST'])
def login():
    jsonRequest = bytesToJson(request.data)
    data = jsonRequest.get("data")
    userList,passwordList = getUserInfo(list(userInfo.find({},{"username":1,"password":1,"_id":0})))
    username = data['username']
    password = h.sha256(data['password'].encode()).hexdigest()
    if username in userList:
        userIndex = userList.index(data['username'])
        if password == passwordList[userIndex]:
            result = {"login": True}
        else:
            result={"login":False}
    else:
        result={"login":False}
    return jsonify(result)

@app.route('/changePassword', methods = ['POST'])  
def changePassword():
    data =  bytesToJson(request.data)
    passowrdString = data['password']
    password = h.sha256(passowrdString.encode()).hexdigest()
    userList,passwordList = getUserInfo(list(userInfo.find({},{"username":1,"password":1,"_id":0})))
    print(passwordList)
    if password not in passwordList:
        userInfo.update({"username":"admin"},{"$set":{"password":password}})
        result = {'status':"Successfully changed password!", "code": 1}
        return jsonify(result)
    else:
        result = {'status':"Old password can not be new password", "code": 0}
        return jsonify(result)

@app.route("/currentSchedule",methods = ['GET'])
def getCurrentSchedule():
    output = []
    for entry in currentSchedule.find():
        output.append({ "time": entry['time'],"status":entry["status"], "duration": entry["delay"]})
    tempOutput = sorted(output, key = lambda val: val["time"])
    return jsonify({"result": tempOutput})
            
    
@app.route("/addBell", methods = ['POST'])
def addBell():
    jsonRequest = bytesToJson(request.data)
    data = jsonRequest.get("data")
    currentScheduleList = getListFromCollection(list(currentSchedule.find({},{ "time":1,"_id": 0})))
    if data["time"] in currentScheduleList and data["isEndBell"]== True:
        currentSchedule.update({"time":data['time'],"delay":"3"},{"$set":{"delay":5}})
        removeBellsAfter(data["time"], currentScheduleList)
        result = {"status":"Successfully updated in database", "code": 1}
        return jsonify(result)
    else:
        if data["time"] in currentScheduleList:
            result = {"status":"Bell is already present", "code": 0}
            return jsonify(result)
        else:
            currentSchedule.insert({"time":data["time"],"delay":data["delay"], "status":"Not Rang"})
            if data["isEndBell"]==True:
                removeBellsAfter(data["time"], currentScheduleList)
            result = {"status":"Successfully updated in database", "code": 1}
            return jsonify(result)
            
@app.route("/deleteBell", methods = ['POST'])
def deleteBell():
    jsonRequest = bytesToJson(request.data)
    data = jsonRequest.get("data")
    currentSchedule.remove({"time": data['time']})
    return jsonify({"status": "Successfully deleted"})
     
            
@app.route("/RestoreDefaults", methods = ['GET'])
def restoreDefaults():
    currentSchedule.drop()
    for entry in defaultSchedule.find():
        currentSchedule.insert({"time": entry['time'],"status":"Not Rang", "delay": entry['delay']})
    return 'restored to defaults'

@app.route("/clearSchedule", methods = ['GET'])
def clearSchedule():
    currentSchedule.drop()
    return 'cleared schedule'
    
@app.route("/getHolidays", methods = ['GET'])
def getHolidays():
    output = []
    for entry in holidayData.find():
        output.append({"date": entry['Date']})
    return jsonify({"result": output})

@app.route("/getLogs",methods = ['GET'])
def getLogs():
    output=[]
    for entry in logDetails.find():
        output.append({"time":entry['time'],"date":entry['Date']})
    return jsonify({"result":output})

@app.route("/addHoliday", methods=['POST'])
def addHoliday():
    jsonRequest = bytesToJson(request.data)
    data = jsonRequest.get("data")
    holidayList = getHolidayFromCollection(list(holidayData.find({},{ "Date":1,"_id": 0})))
    if(data == None):
        result = {'status': 'Entered date is less than current date', "code": 0}
        return jsonify(result)
    if('endDate' not in dict.keys(data)):
        if data["date"] in holidayList:
            result = {"status" : "Date already present in holiday list", "code": 0}
            return jsonify(result)
        else:
            result = {'status':"Successfully updated in holiday list", "code": 1}
            holidayData.insert({"Date":data['date']})
            return jsonify(result)

    else:
        startDateList = data["date"].split('/')
        startDate = date(int(startDateList[2]),int(startDateList[1]),int(startDateList[0]))
        endDateList = data["endDate"].split('/')
        endDate = date(int(endDateList[2]),int(endDateList[1]),int(endDateList[0]))
        delta = endDate - startDate
        holidays = []
        for i in range(delta.days + 1):
            holidays.append(startDate + timedelta(days=i))
        if(len(holidays)==0):
            result = {"status":"End date must be greater than Start Date!", "code": 0}
            return jsonify(result)   
    
        if data["date"] in holidayList or data['endDate'] in holidayList:
            print("Date already present in holiday list")
            result = {"status" : "Date already present in holiday list", "code": 0}
            return jsonify(result)
        else:
            result = {'status':"Successfully updated in holiday list", "code": 1}
            for days in holidays:
                day = days.strftime('%d/%m/%Y')
                print(day)
                holidayData.insert({'Date':day})
            return jsonify(result)
@app.route('/deleteHoliday',methods=['POST'])
def deleteHoliday():
    jsonRequest = bytesToJson(request.data)
    data = jsonRequest.get("data")
    holidayList = getHolidayFromCollection(list(holidayData.find({},{ "Date":1,"_id": 0})))
    result = {"status":"Successfully deleted from holiday list"}
    if data['date'] in holidayList:
        holidayData.remove({'Date':data['date']})
    else:
       result['status'] = "The Day is not present in Holiday List"
    return jsonify(result)
    
    
@app.route('/clearHolidays', methods=['POST'])
def clearHolidays():
    holidayData.drop()
    return jsonify({"status": "Successfully Cleared!"})
        
@app.route("/clearLog", methods = ['POST'])    
def clearLog():
    logDetails.drop()
    return 'restored to defaults'
            
if __name__ == "__main__":
    app.run(host = "0.0.0.0")
