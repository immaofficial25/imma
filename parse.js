const fs = require('fs');

const data = `Class 4 Soft skills 1st Class Sunday (7AM-8AM) meet.google.com/bqm-asmg-krw 2nd Class Monday (8AM-9AM) meet.google.com/bqm-asmg-krw 3rd Class Saturday(5PM-6PM) meet.google.com/bqm-asmg-krw 4th Class Wednesday(7PM-8PM) meet.google.com/bqm-asmg-krw 5th Class Thrusday(6PM-7PM) meet.google.com/ykv-ovxr-xvm 6th Class Friday(7AM-8AM) meet.google.com/ykv-ovxr-xvm 7th Class Sunday(10AM-11AM) meet.google.com/ykv-ovxr-xvm 8th class Monday(5PM-6PM) meet.google.com/ykv-ovxr-xvm 9th Class Wednesday (6PM-7PM) meet.google.com/ykv-ovxr-xvm 10th Class Thrusday (7AM-8AM) meet.google.com/bqm-asmg-krw Class 5 Soft skills 1st Class Sunday (7AM-8AM) meet.google.com/ykv-ovxr-xvm 2nd Class Monday (8AM-9AM) meet.google.com/ykv-ovxr-xvm 3rd Class Saturday(5PM-6PM) meet.google.com/ykv-ovxr-xvm 4th Class Wednesday(7PM-8PM) meet.google.com/ykv-ovxr-xvm 5th Class Thrusday(6PM-7PM) meet.google.com/bqm-asmg-krw 6th Class Friday(7AM-8AM) meet.google.com/bqm-asmg-krw 7th Class Sunday(10AM-11AM) meet.google.com/bqm-asmg-krw 8th class Monday(5PM-6PM) meet.google.com/bqm-asmg-krw 9th Class Wednesday (6PM-7PM) meet.google.com/bqm-asmg-krw 10th Class Thrusday (7AM-8AM) meet.google.com/ykv-ovxr-xvm Class 6 Soft skills 1st Class Sunday (6PM-7PM) meet.google.com/ykv-ovxr-xvm 2nd Class Monday (7AM-8AM) meet.google.com/ykv-ovxr-xvm 3rd Class Wednesday(8AM-9AM) meet.google.com/ykv-ovxr-xvm 4th Class Thrusday(5PM-6PM) meet.google.com/ykv-ovxr-xvm 5th Class Friday(8AM-9AM) meet.google.com/ykv-ovxr-xvm 6th Class Saturday(6PM-7PM) meet.google.com/ykv-ovxr-xvm 7th Class Sunday(8AM-9AM) meet.google.com/bqm-asmg-krw 8th class Monday(7PM-8PM) meet.google.com/bqm-asmg-krw 9th Class Wednesday (7AM-8AM) meet.google.com/bqm-asmg-krw 10th Class Friday (6PM-7PM) meet.google.com/bqm-asmg-krw 11th Class Saturday (7AM-8AM) meet.google.com/bqm-asmg-krw 12th Class Saturday (4PM-5PM) meet.google.com/bqm-asmg-krw Class 7 Soft skills 1st Class Sunday (6PM-7PM) meet.google.com/bqm-asmg-krw 2nd Class Monday (7PM-8PM) meet.google.com/bqm-asmg-krw 3rd Class Wednesday(8AM-9AM) meet.google.com/bqm-asmg-krw 4th Class Thrusday(5PM-6PM) meet.google.com/bqm-asmg-krw 5th Class Friday(8AM-9AM) meet.google.com/bqm-asmg-krw 6th Class Saturday(6PM-7PM) meet.google.com/bqm-asmg-krw 7th Class Sunday(8AM-9AM) meet.google.com/ykv-ovxr-xvm 8th class Monday(7PM-8PM) meet.google.com/ykv-ovxr-xvm 9th Class Wednesday (7AM-8AM) meet.google.com/ykv-ovxr-xvm 10th Class Friday (6PM-7PM) meet.google.com/ykv-ovxr-xvm 11th Class Saturday (7AM-8AM) meet.google.com/ykv-ovxr-xvm 12th Class Saturday (4PM-5PM) meet.google.com/ykv-ovxr-xvm Class 8 Soft skills 1st Class Sunday (5PM-6PM) meet.google.com/bqm-asmg-krw 2nd Class Monday (6PM-7PM) meet.google.com/bqm-asmg-krw 3rd Class Thrusday(7PM-8PM) meet.google.com/bqm-asmg-krw 4th Class Sunday(7PM-8PM) meet.google.com/bqm-asmg-krw 5th Class Wednesday(5PM-6PM) meet.google.com/ykv-ovxr-xvm 6th Class Friday(7PM-8PM) meet.google.com/ykv-ovxr-xvm 7th Class Sunday(5PM-6PM) meet.google.com/ykv-ovxr-xvm 8th class Friday(7PM-8PM) meet.google.com/bqm-asmg-krw 9th Class Monday (6PM-7PM) meet.google.com/ykv-ovxr-xvm 10th Class Wednesday (5PM-6PM) meet.google.com/bqm-asmg-krw 11th Class Thrusday (7PM-8PM) meet.google.com/ykv-ovxr-xvm 12th Class Sunday (7PM-8PM) meet.google.com/ykv-ovxr-xvm`;

const classes = data.split(/Class \d+ Soft skills /).filter(Boolean);

// bengalicourse.json is already classes 4 to 8. So indices 0 to 4 correspond to Class 4 to Class 8.
const coursesFile = 'data/bengalicourse.json';
const courses = JSON.parse(fs.readFileSync(coursesFile, 'utf8'));

classes.forEach((classData, idx) => {
  const courseIdx = idx; 
  if(courses[courseIdx]) {
     // match like "1st Class Sunday (7AM-8AM) meet.google.com/..."
     const regex = /(\d+(?:st|nd|rd|th)\s+[Cc]lass\s+\w+\s*\([^)]+\))\s*(meet\.google\.com\/[a-z-]+)/g;
     const liveClasses = [];
     let match;
     while ((match = regex.exec(classData)) !== null) {
       liveClasses.push({
         title: match[1],
         url: "https://" + match[2]
       });
     }
     courses[courseIdx].resources.liveClasses = liveClasses;
  }
});

fs.writeFileSync(coursesFile, JSON.stringify(courses, null, 2));
console.log("Updated data/bengalicourse.json");
