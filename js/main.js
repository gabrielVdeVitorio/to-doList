const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container')
const buttonAddTask = document.getElementById('button--addTask')
const divMensagemDeErro = document.getElementById('div--mensagemParaInputVazio');
restoreData();

function addTask()
{
  try
  {
    if (inputBox.value === '') throw new Error('É necessário conter algum texto para criar uma tarefa.');
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = '\u00d7';
    li.textContent = inputBox.value;
    listContainer.appendChild(li);
    li.appendChild(span);
    inputBox.value = '';
    saveData();
  }
  catch (error)
  {
    console.error(error);
    showError();
  }
}

const listItensEvents =
{
  SPAN: (event) => {event.target.parentElement.remove(); saveData(); },
  LI: (event) => {event.target.classList.toggle('checked'); saveData();}
}

buttonAddTask.addEventListener('click', addTask);
inputBox.addEventListener('keydown', (event) => { if (event.key === 'Enter') addTask(); });
listContainer.addEventListener('click', (event) =>
{
  listItensEvents[event.target.tagName](event);
}, false);

function showError()
{
  divMensagemDeErro.classList.remove('fade-in-out');
  void divMensagemDeErro.offsetWidth;
  divMensagemDeErro.classList.add('fade-in-out');
}

function saveData()
{
  localStorage.setItem("data", listContainer.innerHTML);
}

function restoreData()
{
  listContainer.innerHTML = localStorage.getItem('data');
}