let show = false;

function showMessage(msg) {
  show = true;
  console.log(`Render: ${show ? msg : 'null'}`);

  const timerId = setTimeout(() => {
    show = false;
    console.log(`After timeout: ${show ? msg : 'null'}`);
  }, 3000);

  console.log('Timer ID:', timerId); // a number
}

showMessage('Account updated!');