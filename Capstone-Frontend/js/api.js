const API_BASE = "http://localhost:8080/api";

async function GET(url){

const response = await fetch(API_BASE + url);

return response.json();

}

async function POST(url){

const response = await fetch(API_BASE + url,{

method:"POST"

});

return response.json();

}

async function PUT(url){

const response = await fetch(API_BASE + url,{

method:"PUT"

});

return response.json();

}