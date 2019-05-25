from datetime import datetime
def ScheduleToLists(schedule):
    timeList = [ datetime.strptime(x.get("time"),"%H:%M:%S").time() for x in schedule]
    statusList = [ x.get("status") for x in schedule]
    delayList = [ x.get("delay") for x in schedule]
    return timeList, statusList, delayList

def getSchedule(collection):
    schedule = []
    for item in collection.find():
        schedule.append(item)
    return schedule
    
def getHolidayList(dateListString):
    year = datetime.now().year
    holidayData = list(map(lambda x : datetime.strptime(x['Date'],"%d/%m/%Y").date(),dateListString))
    holidayData = list(map(lambda x : x.replace(year=year),holidayData))
    return holidayData

def toTimeList(collection):
    result = []
    for element in collection.find():
        result.append(datetime.strptime(element["time"], "%H:%M:%S"))
    return result





