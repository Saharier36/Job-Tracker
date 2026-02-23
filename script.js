let interviewList = [];
let rejectList = [];
let currentStatus = "filter-btn-all";

let totalCount = document.getElementById("total-count");
let interviewCount = document.getElementById("interview-count");
let rejectedCount = document.getElementById("rejected-count");
let jobsCount = document.getElementById("jobs-count");

const allFilterButtons = document.getElementById("filter-btn-all");
const interviewFilterButtons = document.getElementById("filter-btn-interview");
const rejectedFilterButtons = document.getElementById("filter-btn-rejected");

const allJobSections = document.getElementById("all-jobs");
const mainContainer = document.querySelector("main");
const filteredJobsSection = document.getElementById("filtered-jobs");

function calculateCounts() {
  totalCount.innerText = allJobSections.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectList.length;

  if (currentStatus === "filter-btn-all") {
    jobsCount.innerText = `${allJobSections.children.length} jobs`;
  } else if (currentStatus === "filter-btn-interview") {
    jobsCount.innerText = `${interviewList.length} jobs`;
  } else if (currentStatus === "filter-btn-rejected") {
    jobsCount.innerText = `${rejectList.length} jobs`;
  }
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
  currentStatus = id;

  if (id === "filter-btn-interview") {
    allJobSections.classList.add("hidden");
    filteredJobsSection.classList.remove("hidden");
    renderInterview();
  } else if (id === "filter-btn-all") {
    allJobSections.classList.remove("hidden");
    filteredJobsSection.classList.add("hidden");
  } else if (id === "filter-btn-rejected") {
    allJobSections.classList.add("hidden");
    filteredJobsSection.classList.remove("hidden");
    renderRejected();
  }
  calculateCounts();
}

// Click Button
mainContainer.addEventListener("click", function (event) {
  // interview button
  if (event.target.classList.contains("interview-btn")) {
    const parentNode = event.target.parentNode.parentNode;
    const companyName = parentNode.querySelector(".company-name").innerText;
    const jobPosition = parentNode.querySelector(".job-position").innerText;
    const jobData = parentNode.querySelector(".job-data").innerText;
    const jobStatus = parentNode.querySelector(".job-status").innerText;
    const jobDescription =
      parentNode.querySelector(".job-description").innerText;

    parentNode.querySelector(".job-status").innerHTML =
      `<p class="text-green-500 w-fit rounded-md text-sm font-bold">INTERVIEW</p>`;

    const jobInfo = {
      companyName,
      jobPosition,
      jobData,
      jobStatus: "INTERVIEW",
      jobDescription,
    };

    const existingCompany = interviewList.find(
      (item) => item.companyName == jobInfo.companyName,
    );

    if (!existingCompany) {
      interviewList.push(jobInfo);
    }

    rejectList = rejectList.filter(
      (item) => item.companyName !== jobInfo.companyName,
    );

    if (currentStatus == "filter-btn-interview") {
      renderInterview();
    }

    calculateCounts();
  }
  // rejected button
  else if (event.target.classList.contains("rejected-btn")) {
    const parentNode = event.target.parentNode.parentNode;
    const companyName = parentNode.querySelector(".company-name").innerText;
    const jobPosition = parentNode.querySelector(".job-position").innerText;
    const jobData = parentNode.querySelector(".job-data").innerText;
    const jobStatus = parentNode.querySelector(".job-status").innerText;
    const jobDescription =
      parentNode.querySelector(".job-description").innerText;

    parentNode.querySelector(".job-status").innerHTML =
      `<p class="text-red-500 w-fit rounded-md text-sm font-bold">REJECTED</p>`;

    const jobInfo = {
      companyName,
      jobPosition,
      jobData,
      jobStatus: "REJECTED",
      jobDescription,
    };

    const existingCompany = rejectList.find(
      (item) => item.companyName == jobInfo.companyName,
    );

    if (!existingCompany) {
      rejectList.push(jobInfo);
    }
    interviewList = interviewList.filter(
      (item) => item.companyName !== jobInfo.companyName,
    );

    if (currentStatus == "filter-btn-rejected") {
      renderRejected();
    }
    calculateCounts();
  } // delete button
  else if (
    event.target.classList.contains("delete-btn") ||
    event.target.closest(".delete-btn")
  ) {
    const deleteBtn = event.target.closest(".delete-btn");
    const card = deleteBtn.closest(".card");

    delete_modal.showModal();
    document.getElementById("confirm-delete").onclick = function () {
      const companyName = card.querySelector(".company-name").innerText;

      interviewList = interviewList.filter(
        (item) => item.companyName !== companyName,
      );
      rejectList = rejectList.filter(
        (item) => item.companyName !== companyName,
      );

      card.remove();

      if (currentStatus === "filter-btn-interview") {
        renderInterview();
      } else if (currentStatus === "filter-btn-rejected") {
        renderRejected();
      }

      calculateCounts();
    };
  }
});

// rendering Interview

function renderInterview() {
  filteredJobsSection.innerHTML = "";
  if (interviewList.length === 0) {
    filteredJobsSection.innerHTML = `
      <div class="flex flex-col items-center justify-center mt-6 text-center card gap-2 bg-white shadow-md rounded-lg p-6 lg:p-20 mb-4">
        <img src="./jobs.png" alt="" class="mb-4">
        <p class="text-lg font-bold text-[#002C5C]">No Jobs Available</p>
        <p class="text-sm text-gray-500">Check back soon for new job opportunities</p>
      </div>
    `;
    return;
  }
  for (let interview of interviewList) {
    let div = document.createElement("div");
    div.classList =
      "card flex md:flex-row justify-between gap-2 bg-white shadow-md rounded-lg p-4 mb-4 mt-6";
    div.innerHTML = `
    <!-- main-1 -->
          <div class="job-cards">
            <h3 class="company-name text-lg font-bold">${interview.companyName}</h3>
            <p class="job-position text-gray-500 mb-5">
              ${interview.jobPosition}
            </p>
            <p class="job-data text-sm text-gray-500 mb-5">
              ${interview.jobData}
            </p>
            <p class="job-status w-fit bg-[#eef4ff] text-green-500 px-3 py-2 rounded-md text-sm font-bold">
              ${interview.jobStatus}
            </p>
            <p class="job-description mt-2 mb-5">
              ${interview.jobDescription}
            </p>
            <div>
              <button
                class="interview-btn btn text-green-500 border-green-500 bg-white"
              >
                Interview
              </button>
              <button
                class="rejected-btn btn text-red-500 border-red-500 bg-white"
              >
                Rejected
              </button>
            </div>
          </div>
          <!-- main-2 -->
          <div>
            <button class="delete-btn btn btn-circle">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
    `;
    filteredJobsSection.appendChild(div);
  }
}

// rendering Rejected

function renderRejected() {
  filteredJobsSection.innerHTML = "";

  if (rejectList.length === 0) {
    filteredJobsSection.innerHTML = `
      <div class="flex flex-col items-center justify-center mt-6 text-center card gap-2 bg-white shadow-md rounded-lg p-6 lg:p-20 mb-4">
        <img src="./jobs.png" alt="" class="mb-4">
        <p class="text-lg font-bold text-[#002C5C]">No Jobs Available</p>
        <p class="text-sm text-gray-500">Check back soon for new job opportunities</p>
      </div>
    `;
    return;
  }
  for (let rejected of rejectList) {
    let div = document.createElement("div");
    div.classList =
      "card flex md:flex-row justify-between gap-2 bg-white shadow-md rounded-lg p-4 mb-4 mt-6";
    div.innerHTML = `
    <!-- main-1 -->
          <div class="job-cards">
            <h3 class="company-name text-lg font-bold">${rejected.companyName}</h3>
            <p class="job-position text-gray-500 mb-5">
              ${rejected.jobPosition}
            </p>
            <p class="job-data text-sm text-gray-500 mb-5">
              ${rejected.jobData}
            </p>
            <p class="job-status w-fit bg-[#eef4ff] text-red-500 px-3 py-2 rounded-md text-sm font-bold">
              ${rejected.jobStatus}
            </p>
            <p class="job-description mt-2 mb-5">
              ${rejected.jobDescription}
            </p>
            <div>
              <button
                class="interview-btn btn text-green-500 border-green-500 bg-white"
              >
                Interview
              </button>
              <button
                class="rejected-btn btn text-red-500 border-red-500 bg-white"
              >
                Rejected
              </button>
            </div>
          </div>
          <!-- main-2 -->
          <div>
            <button class="delete-btn btn btn-circle">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
    `;
    filteredJobsSection.appendChild(div);
  }
}
