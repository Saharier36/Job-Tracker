let interviewList = [];
let rejectList = [];

let totalCount = document.getElementById("total-count");
let interviewCount = document.getElementById("interview-count");
let rejectedCount = document.getElementById("rejected-count");
let jobsCount = document.getElementById("jobs-count");

const allFilterButtons = document.getElementById("filter-btn-all");
const interviewFilterButtons = document.getElementById("filter-btn-interview");
const rejectedFilterButtons = document.getElementById("filter-btn-rejected");

const allJobSections = document.getElementById("all-jobs");

const mainContainer = document.querySelector("main");

function calculateCounts() {
  totalCount.innerText = allJobSections.children.length;
  jobsCount.innerText = `${allJobSections.children.length} jobs`;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectList.length;
}
calculateCounts();

function toggleStyle(id) {
  allFilterButtons.classList.remove("bg-[#3B82F6]", "text-white");
  interviewFilterButtons.classList.remove("bg-[#3B82F6]", "text-white");
  rejectedFilterButtons.classList.remove("bg-[#3B82F6]", "text-white");

  allFilterButtons.classList.add("btn");
  interviewFilterButtons.classList.add("btn");
  rejectedFilterButtons.classList.add("btn");

  document.getElementById(id).classList.add("bg-[#3B82F6]", "text-white");
}
