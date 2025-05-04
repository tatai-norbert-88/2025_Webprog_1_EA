let code = "VH4FXAujkod001";
let url = "http://gamf.nhely.hu/ajax2/";

async function read() {
  
  let response = await fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: "code=" + code + "&op=read"
  });

  let data = await response.text();
  data = JSON.parse(data);
  let list = data.list;
  let str = "<h1>Rögzített adatok</h1>";
  str += "<p>Rekordok száma: " + data.rowCount + "</p>";
  str += "<p>Utolsó 100 rekord:</p>";
  str += "<table><tr><th>ID</th><th>Név</th><th>Magasság</th><th>Súly</th><th>Kód</th></tr>";
  for (let i = 0; i < list.length; i++) {
    str += "<tr><td>" + list[i].id + "</td><td>" + list[i].name + "</td><td>" + list[i].height + "</td><td>" + list[i].weight + "</td><td>" + list[i].code + "</td></tr>";
  }
  str += "</table>";
  document.getElementById("readDiv").innerHTML = str;
}

async function create() {
  let name = document.getElementById("name1").value;
  let height = document.getElementById("height1").value;
  let weight = document.getElementById("weight1").value;
  if (name.length > 0 && height.length > 0 && weight.length > 0) {
    let response = await fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: "code=" + code + "&op=create&name=" + name + "&height=" + height + "&weight=" + weight
    });
    let data = await response.text();
    document.getElementById("createResult").innerHTML = (data > 0) ? "Mentés sikeres!" : "Mentés sikertelen!";
    read();
  } else {
    document.getElementById("createResult").innerHTML = "Hiba: Minden mező kötelező!";
  }
}

async function getDataForId() {
  let id = document.getElementById("idUpd").value;
  let response = await fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: "code=" + code + "&op=read"
  });

  let data = await response.text();
  data = JSON.parse(data);
  let list = data.list;
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == id) {
      document.getElementById("name2").value = list[i].name;
      document.getElementById("height2").value = list[i].height;
      document.getElementById("weight2").value = list[i].weight;
    }
  }
}

async function update() {
  let id = document.getElementById("idUpd").value;
  let name = document.getElementById("name2").value;
  let height = document.getElementById("height2").value;
  let weight = document.getElementById("weight2").value;
  if (id.length > 0 && name.length > 0 && height.length > 0 && weight.length > 0) {
    let response = await fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: "code=" + code + "&op=update&id=" + id + "&name=" + name + "&height=" + height + "&weight=" + weight
    });
    let data = await response.text();
    document.getElementById("updateResult").innerHTML = (data > 0) ? "Update sikeres!" : "Update sikertelen!";
    read();
  } else {
    document.getElementById("updateResult").innerHTML = "Hiba: Minden mező kötelező!";
  }
}

async function deleteF() {
  let id = document.getElementById("idDel").value;
  if (id.length > 0) {
    let response = await fetch(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: "code=" + code + "&op=delete&id=" + id
    });
    let data = await response.text();
    document.getElementById("deleteResult").innerHTML = (data > 0) ? "Törlés sikeres!" : "Törlés sikertelen!";
    read();
  } else {
    document.getElementById("deleteResult").innerHTML = "Hiba: ID szükséges!";
  }
}

window.onload = read;