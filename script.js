
const api_url = "http://192.168.1.202:1234/book"

function loadData(records = []) {
    var table_data = "";
        for(let i=0; i<records.length; i++) {
                table_data += `<tr>`;
                table_data += `<td>${records[i]['bk_id']}</td>`;
                table_data += `<td>${records[i]['bk_name']}</td>`;
                table_data += `<td>${records[i]['publisher']}</td>`;
                table_data += `<td>${records[i]['author']}</td>`;
                table_data += `<td>${records[i]['price']}</td>`;
                table_data += `<td>${records[i]['type']}</td>`;
                table_data += `<td>`;
                table_data += `<a href="edit.html?bk_id=${records[i]['bk_id']}"><button class="btn btn-primary">Edit</button></a>`;
                table_data += '&nbsp;&nbsp;';
                table_data += `<button class="btn btn-danger" onclick=deleteData('${records[i]['bk_id']}')>Delete</button>`;
                table_data += `</td>`;
                table_data += `</tr>`;
        }
        console.log(table_data);
        document.getElementById("tbody").innerHTML = table_data;
}
function getData(){
    fetch(api_url)
    .then((response) =>response.json())
    .then((data) => {
            //console.table(data);
            loadData(data);
    });
}

function getDataById(bk_id) {
    fetch(`${api_url}edit?bk_id=${bk_id}`)
    .then((response) => response.json())
    .then((data) => {

            console.log(data);
            document.getElementById("bk_id").value = data[0]['bk_id'];
            document.getElementById("bk_name").value = data[0]['bk_name'];
            document.getElementById("publisher").value = data[0]['publisher'];
            document.getElementById("author").value = data[0]['author'];
            document.getElementById("price").value = data[0]['price'];
            document.getElementById("type").value = data[0]['type'];
    })
}

function postData() {
    var bk_name = document.getElementById("bk_name").value;

    var bk_name = document.getElementById("bk_name").value;
    var publisher = document.getElementById("publisher").value;
    var author = document.getElementById("author").value;
    var price = document.getElementById("price").value;
    var type = document.getElementById("type").value;

    data = {bk_id:bk_id, bk_name: bk_name, publisher: publisher, author: author, price: price, type: type};

    fetch(api_url, {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
            console.log(data);
            window.location.href = "index.html";
    })
}

function putData() {

    var Id = document.getElementById("bk_id").value;
    var bk_name = document.getElementById("bk_name").value;
    var publisher = document.getElementById("publisher").value;
    var author = document.getElementById("author").value;
    var price = document.getElementById("price").value;
    var type = document.getElementById("type").value;

    data = {bk_id: bk_id, bk_name: bk_name, publisher: publisher, author: author, price: price, type: type};
    console.log(data)
    apiedit_url=api_url.concat("edit")
    fetch(api_url, {
            mode: 'cors',
            method: "PUT",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
            console.table(data);
            window.location.href = "index.html";
    })
}

function deleteData(bk_id) {
    console.log(bk_id);
    user_input = confirm("Are you sure you want to delete this record?");
    if(user_input) {
            fetch(api_url+"?bk_id="+bk_id, {
                    method: "DELETE",
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    //body: JSON.stringify({"bk_id": bk_id})
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                window.location.reload();
        })
}
}


