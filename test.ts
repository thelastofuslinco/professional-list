const postUser = async (params) =>
  fetch('http://localhost:3000/user', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  });

for (let index = 1; index <= 100; index++) {
  const element = {
    name: `name ${index}`,
    email: `email ${index}`,
    cpf: `cpf ${index}`,
    phone: `phone ${index}`,
    password: `password${index}`,
    skills: [`skill ${index}`],
  };

  postUser(element);
}
