const increasing = document.getElementById('increasing')
const decreasing = document.getElementById('decreasing')
const showTableButton = document.getElementById('showTable')

const select = document.querySelector(".select")
const mainTable = document.querySelector(".main__table")
const table1 = document.querySelector(".table1")
const table2 = document.querySelector(".table2")

const renderTable = (arr, table) => {
  for (let j = 0; j < arr?.length; j ++){
    const tr = document.createElement("tr")
    table.append(tr)
    for (let i = 0; i < arr[j]?.length; i++){
      const td = document.createElement("td")
      td.textContent = arr[j][i]
      tr.append(td)
    }
  }
}

const createMainTable = (arr, table) => {
  while (table1.children.length > 0) {
    table1.removeChild(table1.lastChild);
  }
  while (table2.children.length > 0) {
    table2.removeChild(table2.lastChild);
  }

  renderTable(arr, table)
}

const renderSortedTable = (arr, table) => {
  while (table1.children.length > 0) {
    table1.removeChild(table1.lastChild);
  }
  while (table2.children.length > 0) {
    table2.removeChild(table2.lastChild);
  }
  renderTable(arr, table)
}

const fetchInitialData = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:8000`)

    const data = await response.json()
    return data.res
  } catch (error) {
    alert('Error', error)
  }
}
const fetchFormattedData = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/getFormattedArray?digitsAfterDot=${select.value}`)

    const data = await response.json()
    return data.res
  } catch (error) {
    alert('Error', error)
  }
}
const fetchSortedData = async (sorting) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/getSortingArray?sorting=${sorting}&digitsAfterDot=${select.value}`
    )

    const data = await response.json()
    return data.res
  } catch (error) {
    alert('Error', error)
  }
}

select.addEventListener("change", async () => {
  const array = await fetchFormattedData()

  while (mainTable.children.length > 0) {
    mainTable.removeChild(mainTable.lastChild);
  }

  createMainTable(array, mainTable)
})

showTableButton.addEventListener("click", async () => {
  const array = await fetchInitialData()

  while (mainTable.children.length > 0) {
    mainTable.removeChild(mainTable.lastChild);
  }

  createMainTable(array, mainTable)
})

increasing.addEventListener("click", async () => {
  const array = await fetchSortedData('asc')

  renderSortedTable(array, table1)
})
decreasing.addEventListener("click", async () => {
  const array = await fetchSortedData('desc')

  renderSortedTable(array, table2)
})
