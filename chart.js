document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("dataTable");
    const ctx = document.getElementById("lineChart").getContext("2d");
  
    let chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["1", "2", "3", "4", "5"],
        datasets: [{
          label: "Kiválasztott sor adatai",
          data: [],
          borderWidth: 2,
          borderColor: "blue",
          backgroundColor: "rgba(0, 123, 255, 0.2)",
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  
    const rows = table.querySelectorAll("tbody tr");
  
    rows.forEach(row => {
      row.addEventListener("click", () => {
        // Előző kijelölések törlése
        rows.forEach(r => r.classList.remove("selected"));
        row.classList.add("selected");
  
        // Sor adatainak lekérése
        const rowData = Array.from(row.children).map(cell => parseFloat(cell.textContent));
        chart.data.datasets[0].data = rowData;
        chart.update();
      });
    });
  });
  