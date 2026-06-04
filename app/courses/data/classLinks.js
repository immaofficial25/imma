const bengaliLinks = [
  { title: "Class 4 - 1st Session (Sunday 7AM-8AM)", url: "https://meet.google.com/bdi-jtrk-xbq" },
  { title: "Class 4 - 2nd Session (Monday 8AM-9AM)", url: "https://meet.google.com/bdi-jtrk-xbq" },
  { title: "Class 4 - 3rd Session (Saturday 5PM-6PM)", url: "https://meet.google.com/bdi-jtrk-xbq" },
  { title: "Class 4 - 4th Session (Wednesday 7PM-8PM)", url: "https://meet.google.com/bdi-jtrk-xbq" },
  { title: "Class 4 - 5th Session (Thursday 6PM-7PM)", url: "https://meet.google.com/bmv-riwk-ugy" },
  { title: "Class 4 - 6th Session (Friday 7AM-8AM)", url: "https://meet.google.com/bmv-riwk-ugy" },
  { title: "Class 4 - 7th Session (Sunday 10AM-11AM)", url: "https://meet.google.com/bmv-riwk-ugy" },
  { title: "Class 4 - 8th Session (Monday 5PM-6PM)", url: "https://meet.google.com/bmv-riwk-ugy" }
];

const odiaLinks = [
  { title: "Class 4 - 1st Session (Sunday 7AM-8AM)", url: "https://meet.google.com/ewo-cdia-dqb" },
  { title: "Class 4 - 2nd Session (Monday 8AM-9AM)", url: "https://meet.google.com/ewo-cdia-dqb" },
  { title: "Class 4 - 3rd Session (Saturday 5PM-6PM)", url: "https://meet.google.com/ewo-cdia-dqb" },
  { title: "Class 4 - 4th Session (Wednesday 7PM-8PM)", url: "https://meet.google.com/ewo-cdia-dqb" },
  { title: "Class 4 - 5th Session (Thursday 6PM-7PM)", url: "https://meet.google.com/fvn-hdjr-cco" },
  { title: "Class 4 - 6th Session (Friday 7AM-8AM)", url: "https://meet.google.com/fvn-hdjr-cco" },
  { title: "Class 4 - 7th Session (Sunday 10AM-11AM)", url: "https://meet.google.com/fvn-hdjr-cco" },
  { title: "Class 4 - 8th Session (Monday 5PM-6PM)", url: "https://meet.google.com/fvn-hdjr-cco" }
];

const classLinks = {
  bengali: bengaliLinks,
  odia: odiaLinks,
  hindi: [...bengaliLinks]
};

export default classLinks;
