let myLeads=[]
let oldLeads = []
const inputEl =document.getElementById("input-el")
let inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deletebtn = document.getElementById("delete-btn")
let tabbtn = document.getElementById("tab-btn")
const leadsFromlocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if (leadsFromlocalStorage) {
    myLeads = leadsFromlocalStorage
    renderLeads(myLeads)
}

tabbtn.addEventListener("click",function () {
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        let activeTab = tabs[0]
        let activeTabId =activeTab.id
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads" ,JSON.stringify(myLeads))
        renderLeads(myLeads)
    })
})

deletebtn.addEventListener('dblclick',function() {
    localStorage.clear()
    myLeads=[]
    renderLeads(myLeads)
})

inputBtn.addEventListener("click",function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    renderLeads(myLeads)
})

function renderLeads(leads){
    let listItems = ""
    for(let i=0;i<leads.length;i++) {
        listItems +=`
            <li>
              <a target='_blank' href='${leads[i]}'>${leads[i]} 
            </a>
            </li>
        `
    }
    ulEl.innerHTML =listItems
}
