import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

function createTableTemplate(maxPeriods, data, days) {
    for (let g = 0; g < maxPeriods.max(); g++) {
        data.push([`Period ${g + 1}`, "", "", "", "", "", "", ""])
    }

    for (let i = 0; i < days.length; i++) {
        data[0][i + 1] = days[i]
    }

    return data
}

const genRandomNum = (n, min, max, repeat) => {
    let numbers = []

    for (let i = 0; i < n; i++) {
        let random = Math.floor(Math.random() * (max - min + 1) + min)
        if (!repeat) {
            numbers.push(random)
        } else {
            if (numbers.includes(random)) {
                i--
            } else {
                numbers.push(random)
            }
        }
    }

    return numbers
}

const addSubjects = (days, maxPeriods, data, periods) => {
    for (let i = 0; i < days.length; i++) {
        for (let j = 0; j < maxPeriods[i]; j++) {
            data[j + 1][i + 1] = periods[i][j]
        }
    }
    return data
}

const isPeriodAvailable = (data, day, period) => {
    if (data[day + 1][period + 1] === undefined)
        return data[day+1][period] === ""
    else
        return data[day + 1][period + 1] === ""
}

const isTeacherAvailable = async (data, day, period, teacher, allTeachers) => {
    for (const t of allTeachers) {
        if (t.id === teacher) {
            if (t.table === "")
                return true
            else {
                const table = await prisma.tables.findUnique({
                    where: {
                        id: t.table
                    }
                })
                if (table.data === null)
                    return true
                else
                    return table.data[day][period] === "";
            }
        }
    }
}

const checkSubjectLimits = (weeklyCounter, dailyCounter, subjects, random) => {
    return weeklyCounter[random[0]] >= parseInt(subjects[random[0]].weekly) || dailyCounter[random[0]] >= parseInt(subjects[random[0]].daily)
}

export async function POST(req) {
    const {title, standard, division, subjects, maxPeriods} = await req.json()

    const totalSubjects = subjects.length
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    let data = [['Periods ', '', '', '', '', '', "", ""],]
    const allTeachers = await prisma.teachers.findMany()

    // Trimming the days
    for (let p = 0; p < maxPeriods.length; p++) {
        if (maxPeriods[p] === 0) days.splice(p, 1)
    }

    // Max function for array
    Array.prototype.max = function () {
        return Math.max.apply(null, this);
    };

    // Creating the table template
    data = createTableTemplate(maxPeriods, data, days)


    // Initializing weeklyCounter
    let weeklyCounter = []
    let periods = []
    for (let i = 0; i < totalSubjects; i++) {
        weeklyCounter.push(0)
    }

    // Assigning subjects
    for (let i = 0; i < days.length; i++) { // each day

        // Initializing dailyCounter and consecutive
        let dailyCounter = []
        let consecutive = []

        for (let j = 0; j < subjects.length; j++) { // each subject
            dailyCounter.push(0)
            consecutive.push(subjects[j].consecutive)
        }

        periods.push([])

        for (let k = 0; k < maxPeriods[i]; k++) { // each period
            let random = genRandomNum(1, 0, totalSubjects - 1, false)

            const periodAvailable = isPeriodAvailable(data, i, k)
            const teacherAvailable = await isTeacherAvailable(data, i, k, subjects[random[0]].teacher, allTeachers)
            const subjectLimit = checkSubjectLimits(weeklyCounter, dailyCounter, subjects, random)

            const canAssign = periodAvailable && teacherAvailable || teacherAvailable === undefined && !subjectLimit

            if (canAssign) {
                periods[i].push(subjects[random[0]].subject)
                weeklyCounter[random[0]]++
                dailyCounter[random[0]]++
            } else {
                console.log(i, k, subjects[random[0]].subject)
            }
        }
    }

    // Adding subjects to the table
    data = addSubjects(days, maxPeriods, data, periods)

    return NextResponse.json({msg: "Table created successfully", status: "success", data: data})
}