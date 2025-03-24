document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("dataForm");
    const tableBody = document.querySelector("#dataTable tbody");
    const searchInput = document.getElementById("searchInput");
  
    let data = [];
    let sortColumn = null;
    let sortDirection = 1;
  
    function renderTable(rows = data) {
      tableBody.innerHTML = "";
  
      rows.forEach((item, index) => {
        const row = document.createElement("tr");
  
        for (const key of ["name", "email", "city", "position"]) {
          const cell = document.createElement("td");
          cell.textContent = item[key];
          row.appendChild(cell);
        }
  
        const actionCell = document.createElement("td");
  
        const editBtn = document.createElement("button");
        editBtn.textContent = "Szerkesztés";
        editBtn.onclick = () => editRow(index);
  
        const delBtn = document.createElement("button");
        delBtn.textContent = "Törlés";
        delBtn.onclick = () => deleteRow(index);
  
        actionCell.append(editBtn, delBtn);
        row.appendChild(actionCell);
  
        tableBody.appendChild(row);
      });
    }
  
    form.addEventListener("submit", (e) => {
        e.preventDefault();
      
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const city = document.getElementById("city").value.trim();
        const position = document.getElementById("position").value.trim();
  
        if (!name || !email || !city || !position) 
            {
            alert("Minden mező kitöltése kötelező!");
            return;
            }
        
          if (name.length < 4) 
            {
            alert("A névnek legalább 4 karakterből kell állnia!");
            return;
            }
        
          if (!email.includes("@")) 
            {
            alert("Érvénytelen email cím!");
            return;
            }
        
          if (position.length > 10) 
            {
            alert("A beosztás legfeljebb 10 karakter lehet!");
            return;
            }
          data.push({ name, email, city, position });
                form.reset();
                updateTable();

            
    });
  
    function editRow(index) {
      const item = data[index];
      document.getElementById("name").value = item.name;
      document.getElementById("email").value = item.email;
      document.getElementById("city").value = item.city;
      document.getElementById("position").value = item.position;
      deleteRow(index);
    }
  
    function deleteRow(index) {
      data.splice(index, 1);
      updateTable();
    }
  
    function updateTable() {
      let filtered = data.filter((item) =>
        Object.values(item).some(val =>
          val.toLowerCase().includes(searchInput.value.toLowerCase())
        )
      );
  
      if (sortColumn) {
        filtered.sort((a, b) => {
          if (a[sortColumn] < b[sortColumn]) return -1 * sortDirection;
          if (a[sortColumn] > b[sortColumn]) return 1 * sortDirection;
          return 0;
        });
      }
  
      renderTable(filtered);
    }
  
    searchInput.addEventListener("input", updateTable);
  
    document.querySelectorAll("th[data-column]").forEach(th => {
      th.addEventListener("click", () => {
        const column = th.dataset.column;
        if (sortColumn === column) {
          sortDirection *= -1;
        } else {
          sortColumn = column;
          sortDirection = 1;
        }
        updateTable();
      });
    });
  
    // Kezdeti tesztadat
    data = [
      { name: "Nagy Anna", email: "anna@nmail.com", city: "Szeged", position: "Fejlesztő" },
      { name: "Kiss Béla", email: "bela@mail.com", city: "Debrecen", position: "Tesztelő" },
      { name: "Tóth Éva", email: "eva@domain.com", city: "Budapest", position: "Designer" }
    ];
    updateTable();
  });
  