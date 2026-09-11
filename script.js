// ============================================
// مدیریت دیتابیس (LocalStorage)
// ============================================

const DB_KEYS = {
    school: 'school_data',
    grades: 'grades_data',
    attendance: 'attendance_data'
};

// خواندن امن JSON از localStorage
function safeParse(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return fallback;
        return JSON.parse(raw);
    } catch (e) {
        console.error('خطا در خواندن', key, e);
        return fallback;
    }
}

function getSchoolData() {
    let data = safeParse(DB_KEYS.school, { teachers: [], admins: [] });
    
    if (!data || typeof data !== 'object') data = { teachers: [], admins: [] };
    if (!Array.isArray(data.teachers)) data.teachers = [];
    if (!Array.isArray(data.admins)) data.admins = [];
    
    return data;
}

function saveSchoolData(data) {
    try {
        localStorage.setItem(DB_KEYS.school, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('خطا در ذخیره', e);
        return false;
    }
}

function getGradesByClass(classId) {
    if (!classId) return [];
    const data = safeParse(`${DB_KEYS.grades}_${classId}`, []);
    return Array.isArray(data) ? data : [];
}

function saveGradesByClass(classId, grades) {
    if (!classId) return false;
    try {
        localStorage.setItem(`${DB_KEYS.grades}_${classId}`, JSON.stringify(grades));
        return true;
    } catch (e) {
        console.error('خطا در ذخیره نمرات', e);
        return false;
    }
}

function getAttendanceByClass(classId) {
    if (!classId) return {};
    const data = safeParse(`${DB_KEYS.attendance}_${classId}`, {});
    return (data && typeof data === 'object') ? data : {};
}

function saveAttendanceByClass(classId, data) {
    if (!classId) return false;
    try {
        localStorage.setItem(`${DB_KEYS.attendance}_${classId}`, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('خطا در ذخیره حضور غیاب', e);
        return false;
    }
}

// ============================================
// سیستم اشتراک مدیر
// ============================================

function activateSubscription(code) {
    if (!code) return { success: false, message: "کد اشتراک را وارد کنید!" };
    
    const school = getSchoolData();
    const admin = school.admins.find(a => a.subscriptionCode === code.trim().toUpperCase());
    
    if (!admin) {
        return { success: false, message: "کد اشتراک اشتباه است!" };
    }
    
    // اگر اشتراک قبلاً فعال شده، تاریخش را نگه دار
    if (!admin.subscriptionStartDate) {
        admin.subscriptionStartDate = new Date().toISOString().split('T')[0];
        const end = new Date();
        end.setFullYear(end.getFullYear() + 1);
        admin.subscriptionEndDate = end.toISOString().split('T')[0];
        saveSchoolData(school);
    }
    
    const today = new Date().toISOString().split('T')[0];
    if (today > admin.subscriptionEndDate) {
        return { success: false, message: "کد اشتراک شما منقضی شده است! لطفاً کد جدید تهیه کنید." };
    }
    
    localStorage.setItem('subscription_status', 'active');
    localStorage.setItem('activeAdminId', admin.id);
    return { success: true, message: "اشتراک فعال شد!" };
}

// ✅ اصلاح شد: حالا واقعاً تاریخ انقضا را چک می‌کند
function checkSubscription() {
    // مرحله ۱: فلگ اولیه
    if (localStorage.getItem('subscription_status') !== 'active') {
        return false;
    }
    
    // مرحله ۲: پیدا کردن مدیر فعال
    const adminId = localStorage.getItem('activeAdminId');
    if (!adminId) {
        localStorage.removeItem('subscription_status');
        return false;
    }
    
    const school = getSchoolData();
    const admin = school.admins.find(a => a.id === adminId);
    
    if (!admin) {
        localStorage.removeItem('subscription_status');
        localStorage.removeItem('activeAdminId');
        return false;
    }
    
    // مرحله ۳: چک تاریخ انقضا
    if (!admin.subscriptionEndDate) {
        // اگر تاریخی ثبت نشده، اشتراک معتبر نیست
        localStorage.removeItem('subscription_status');
        return false;
    }
    
    const today = new Date().toISOString().split('T')[0];
    if (today > admin.subscriptionEndDate) {
        // منقضی شده — پاکسازی خودکار
        localStorage.removeItem('subscription_status');
        localStorage.removeItem('activeAdminId');
        return false;
    }
    
    // همه چیز درست است
    return true;
}

// تابع کمکی: نمایش تاریخ انقضای اشتراک فعلی (برای پنل مدیر)
function getSubscriptionInfo() {
    const adminId = localStorage.getItem('activeAdminId');
    if (!adminId) return null;
    
    const school = getSchoolData();
    const admin = school.admins.find(a => a.id === adminId);
    if (!admin) return null;
    
    if (!admin.subscriptionEndDate) {
        return { active: false, message: "اشتراک فعال نیست" };
    }
    
    const today = new Date().toISOString().split('T')[0];
    const endDate = admin.subscriptionEndDate;
    const isActive = today <= endDate;
    
    // محاسبه روزهای باقی‌مانده
    const todayMs = new Date(today).getTime();
    const endMs = new Date(endDate).getTime();
    const daysLeft = Math.ceil((endMs - todayMs) / (1000 * 60 * 60 * 24));
    
    return {
        active: isActive,
        endDate: endDate,
        startDate: admin.subscriptionStartDate,
        daysLeft: daysLeft > 0 ? daysLeft : 0,
        schoolName: admin.schoolName
    };
}

// ============================================
// سیستم احراز هویت
// ============================================

function loginAdmin(username, password) {
    if (!username || !password) return { success: false };
    
    const school = getSchoolData();
    const admin = school.admins.find(a => a.username === username && a.password === password);
    
    if (admin) {
        localStorage.setItem('currentUser', username);
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('activeAdminId', admin.id);
        return { success: true };
    }
    return { success: false };
}

function loginTeacher(username, password) {
    if (!username || !password) return { success: false };
    
    const school = getSchoolData();
    const teacher = school.teachers.find(t => t.username === username && t.password === password);
    
    if (teacher) {
        localStorage.setItem('currentUser', username);
        localStorage.setItem('userRole', 'teacher');
        localStorage.setItem('teacherId', teacher.id);
        return { success: true };
    }
    return { success: false };
}

function loginStudent(className, studentName, password) {
    if (!className || !studentName || !password) return false;
    
    const school = getSchoolData();
    for (let teacher of school.teachers) {
        if (!Array.isArray(teacher.classes)) continue;
        for (let cls of teacher.classes) {
            if (cls.name === className) {
                if (!Array.isArray(cls.students)) continue;
                const student = cls.students.find(s => s.name === studentName && s.password === password);
                if (student) {
                    localStorage.setItem('currentUser', studentName);
                    localStorage.setItem('userRole', 'student');
                    localStorage.setItem('classId', cls.id);
                    localStorage.setItem('teacherId', teacher.id);
                    return true;
                }
            }
        }
    }
    return false;
}

// ============================================
// سیستم مالک (صالح)
// ============================================

// ✅ اصلاح شد: کد ۶ کاراکتری تصادفی از حروف بزرگ + اعداد
// تعداد ترکیب‌های ممکن: 36^6 = 2,176,782,336 (بیش از ۲ میلیارد)
function generateOwnerCode() {
    const year = new Date().getFullYear();
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // بدون I, O, 0, 1 برای جلوگیری از اشتباه
    let randomPart = '';
    for (let i = 0; i < 6; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `SALEH-${year}-${randomPart}`;
}

function createAdminByOwner(username, password, schoolName, code) {
    if (!username || !password || !schoolName || !code) {
        return { success: false, message: "تمام فیلدها الزامی است!" };
    }
    
    const school = getSchoolData();
    const exists = school.admins.find(a => a.username === username);
    
    if (exists) {
        return { success: false, message: "این نام کاربری قبلاً برای یک مدیر استفاده شده است!" };
    }
    
    // چک تکراری بودن کد اشتراک
    const codeExists = school.admins.find(a => a.subscriptionCode === code);
    if (codeExists) {
        return { success: false, message: "این کد اشتراک قبلاً استفاده شده است! دوباره تلاش کنید." };
    }
    
    const newAdmin = {
        id: Date.now().toString() + Math.floor(Math.random() * 1000),
        username: username,
        password: password,
        schoolName: schoolName,
        subscriptionCode: code,
        createdAt: new Date().toLocaleDateString('fa-IR')
    };
    
    school.admins.push(newAdmin);
    saveSchoolData(school);
    return { success: true, admin: newAdmin };
}

function getAdminsList() {
    return getSchoolData().admins || [];
}

function deleteAdminByOwner(adminId) {
    const school = getSchoolData();
    const initialLength = school.admins.length;
    school.admins = school.admins.filter(a => a.id !== adminId);
    
    if (school.admins.length === initialLength) {
        return { success: false, message: "مدیر یافت نشد!" };
    }
    
    saveSchoolData(school);
    return { success: true };
}

// ============================================
// توابع کمکی (معلم، دانش‌آموز، ...)
// ============================================

function createTeacherByAdmin(teacherUsername, teacherPassword, teacherSchoolName) {
    if (!teacherUsername || !teacherPassword || !teacherSchoolName) return false;
    
    const school = getSchoolData();
    
    const exists = school.teachers.find(t => t.username === teacherUsername);
    if (exists) {
        alert("این نام کاربری قبلاً برای معلم دیگری استفاده شده است!");
        return false;
    }
    
    const newTeacher = { 
        id: Date.now().toString() + Math.floor(Math.random() * 1000),
        username: teacherUsername, 
        password: teacherPassword, 
        schoolName: teacherSchoolName, 
        classes: []
    };
    school.teachers.push(newTeacher);
    saveSchoolData(school);
    return true;
}

function getTeachersList() {
    const school = getSchoolData();
    return (school.teachers || []).map(t => {
        if (!Array.isArray(t.classes)) t.classes = [];
        return t;
    });
}

function generateRandomPassword() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 4; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    return result;
}

function getStudentsList(teacherId, classId) {
    if (!teacherId || !classId) return [];
    
    const school = getSchoolData();
    const teacher = school.teachers.find(t => t.id === teacherId);
    if (!teacher || !Array.isArray(teacher.classes)) return [];
    
    const cls = teacher.classes.find(c => c.id === classId);
    return (cls && Array.isArray(cls.students)) ? cls.students : [];
}

function addStudentToClass(teacherId, classId, studentName) {
    if (!teacherId || !classId || !studentName) return false;
    
    const school = getSchoolData();
    const teacher = school.teachers.find(t => t.id === teacherId);
    if (!teacher || !Array.isArray(teacher.classes)) return false;
    
    const cls = teacher.classes.find(c => c.id === classId);
    if (!cls || !Array.isArray(cls.students)) return false;
    
    const newId = Date.now().toString() + Math.floor(Math.random() * 1000);
    let newPass = generateRandomPassword();
    
    let isUnique = false;
    let attempts = 0;
    while (!isUnique && attempts < 100) {
        const exists = cls.students.find(s => s.password === newPass);
        if (!exists) isUnique = true;
        else newPass = generateRandomPassword();
        attempts++;
    }
    
    cls.students.push({ id: newId, name: studentName, password: newPass });
    saveSchoolData(school);
    return newPass;
}

function deleteStudentFromClass(teacherId, classId, studentId) {
    if (!teacherId || !classId || !studentId) return false;
    
    const school = getSchoolData();
    const teacher = school.teachers.find(t => t.id === teacherId);
    if (!teacher || !Array.isArray(teacher.classes)) return false;
    
    const cls = teacher.classes.find(c => c.id === classId);
    if (!cls || !Array.isArray(cls.students)) return false;
    
    cls.students = cls.students.filter(s => s.id !== studentId);
    saveSchoolData(school);
    return true;
}

function regeneratePasswordsForClass(teacherId, classId) {
    if (!teacherId || !classId) return null;
    
    const school = getSchoolData();
    const teacher = school.teachers.find(t => t.id === teacherId);
    if (!teacher || !Array.isArray(teacher.classes)) return null;
    
    const cls = teacher.classes.find(c => c.id === classId);
    if (!cls || !Array.isArray(cls.students)) return null;
    
    const newList = [];
    cls.students.forEach(s => {
        let newPass = generateRandomPassword();
        let isUnique = false;
        let attempts = 0;
        
        while (!isUnique && attempts < 100) {
            const exists = cls.students.find(x => x.password === newPass && x.id !== s.id);
            if (!exists) isUnique = true;
            else newPass = generateRandomPassword();
            attempts++;
        }
        
        s.password = newPass;
        newList.push({ name: s.name, password: newPass });
    });
    
    saveSchoolData(school);
    return newList;
}

// ============================================
// توابع پشتیبان‌گیری
// ============================================

function exportAdminFile(adminId) {
    const school = getSchoolData();
    const admin = school.admins.find(a => a.id === adminId);
    if (!admin) { alert("مدیر یافت نشد!"); return; }
    
    const data = {
        admin: admin,
        schoolData: {
            teachers: school.teachers,
            admins: [admin]
        },
        grades: {},
        attendance: {}
    };
    
    school.teachers.forEach(t => {
        if (!Array.isArray(t.classes)) return;
        t.classes.forEach(cls => {
            data.grades[cls.id] = getGradesByClass(cls.id);
            data.attendance[cls.id] = getAttendanceByClass(cls.id);
        });
    });
    
    downloadJSON(data, `Admin_${admin.username}_File.json`);
    alert("فایل مدیر ساخته شد!");
}

function exportTeacherFile(teacherId) {
    const school = getSchoolData();
    const teacher = school.teachers.find(t => t.id === teacherId);
    if (!teacher) { alert("معلم یافت نشد!"); return; }
    
    if (!Array.isArray(teacher.classes)) teacher.classes = [];
    
    const data = {
        teacher: teacher,
        schoolData: {
            teachers: [teacher],
            admins: []
        },
        grades: {},
        attendance: {}
    };
    
    teacher.classes.forEach(cls => {
        data.grades[cls.id] = getGradesByClass(cls.id);
        data.attendance[cls.id] = getAttendanceByClass(cls.id);
    });
    
    downloadJSON(data, `Teacher_${teacher.username}_File.json`);
    alert("فایل معلم ساخته شد!");
}

function exportClassFile(classId) {
    const school = getSchoolData();
    const teacherId = localStorage.getItem('teacherId');
    const teacher = school.teachers.find(t => t.id === teacherId);
    if (!teacher) { alert("معلم یافت نشد!"); return; }
    
    if (!Array.isArray(teacher.classes)) teacher.classes = [];
    
    const cls = teacher.classes.find(c => c.id === classId);
    if (!cls) { alert("کلاس یافت نشد!"); return; }
    
    const data = {
        teacher: teacher,
        class: cls,
        classId: classId,
        grades: {
            [classId]: getGradesByClass(classId)
        },
        attendance: {
            [classId]: getAttendanceByClass(classId)
        }
    };
    
    downloadJSON(data, `Class_${cls.name}_File.json`);
    alert("فایل کلاس ساخته شد!");
}

function exportStudentFile() {
    const user = localStorage.getItem('currentUser');
    const classId = localStorage.getItem('classId');
    
    const allGrades = getGradesByClass(classId);
    const myGrades = allGrades.filter(g => g.name === user);
    
    const data = {
        student: user,
        classId: classId,
        grades: myGrades
    };
    
    downloadJSON(data, 'Student_Backup.json');
    alert("نسخه پشتیبان دانش‌آموز تهیه شد!");
}

function exportBackup() {
    const school = getSchoolData();
    const allGrades = {};
    const allAttendance = {};
    
    school.teachers.forEach(t => {
        if (!Array.isArray(t.classes)) return;
        t.classes.forEach(cls => {
            allGrades[cls.id] = getGradesByClass(cls.id);
            allAttendance[cls.id] = getAttendanceByClass(cls.id);
        });
    });
    
    const data = {
        schoolData: school,
        grades: allGrades,
        attendance: allAttendance,
        backupDate: new Date().toISOString()
    };
    
    downloadJSON(data, 'School_Full_Backup.json');
    alert("فایل پشتیبان کامل دانلود شد!");
}

function downloadJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// ============================================
// توابع بازیابی (Import)
// ============================================

function importBackup() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        
        reader.onload = function(event) {
            try {
                const data = JSON.parse(event.target.result);
                const school = getSchoolData();
                
                if (data.schoolData && Array.isArray(data.schoolData.teachers)) {
                    data.schoolData.teachers.forEach(t => {
                        if (!school.teachers.find(x => x.id === t.id)) {
                            school.teachers.push(t);
                        }
                    });
                }
                
                if (data.schoolData && Array.isArray(data.schoolData.admins)) {
                    data.schoolData.admins.forEach(a => {
                        if (!school.admins.find(x => x.id === a.id)) {
                            school.admins.push(a);
                        }
                    });
                }
                
                if (data.admin && !school.admins.find(a => a.id === data.admin.id)) {
                    school.admins.push(data.admin);
                }
                
                if (data.teacher && !school.teachers.find(t => t.id === data.teacher.id)) {
                    school.teachers.push(data.teacher);
                }
                
                saveSchoolData(school);
                
                if (data.grades && typeof data.grades === 'object') {
                    Object.keys(data.grades).forEach(key => {
                        saveGradesByClass(key, data.grades[key]);
                    });
                }
                
                if (data.attendance && typeof data.attendance === 'object') {
                    Object.keys(data.attendance).forEach(key => {
                        saveAttendanceByClass(key, data.attendance[key]);
                    });
                }
                
                alert("دیتابیس با موفقیت بازیابی شد!");
                window.location.href = 'index.html';
            } catch (err) {
                alert("فایل معتبر نیست! خطا: " + err.message);
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

// ============================================
// توابع عمومی (خروج)
// ============================================
function logout() {
    if (confirm("آیا می‌خواهید خارج شوید؟")) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userRole');
        localStorage.removeItem('teacherId');
        localStorage.removeItem('classId');
        localStorage.removeItem('activeClassId');
        localStorage.removeItem('activeAdminId');
        localStorage.removeItem('subscription_status');
        localStorage.removeItem('internal_note');
        
        window.location.href = 'index.html';
    }
}