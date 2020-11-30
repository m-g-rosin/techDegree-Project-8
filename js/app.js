let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`;

const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const search = document.querySelector("input");
// const names = document.querySelectorAll("h2");

fetch(urlAPI)
    
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err)) 


    function displayEmployees(employeeData) {
        employees = employeeData;
        let employeeHTML = '';

        employees.forEach((employee, index) => {
            let name = employee.name;
            let email = employee.email;
            let city = employee.location.city;
            let picture = employee.picture;

            employeeHTML += `
            <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}">
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
                </div>
                </div>
                `

        });
                gridContainer.innerHTML = employeeHTML;
                const names = document.querySelectorAll(".card h2");
                find(names);
                // search.addEventListener("input", e => {
                //     let input = e.target.value.toUpperCase();
                //     for(let ele of names){
                //         let name = ele.innerHTML.toUpperCase().slice(0, input.length);
                //         console.log(name)
                //         console.log(input)
                //          if(input !== name){
                //              ele.parentNode.parentNode.classList.add("hidden")
                //          }
                //     }
                // })
    }
   
        function displayModal(index) {
            
            //use object destructuring to make our template literal cleaner
            let { name, dob, phone, email, location: { city, street, state, postcode} , picture} = employees[index];
            
            let date = new Date(dob.date);

            const modalHTML = ` 
            <img class="avatar" src="${picture.large}" />
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
                <hr />
                <p>${phone}</p>
                <p class="address">${street.number}, ${street.name}, ${state} ${postcode}</p>
                <p>Birthday:
            ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
            </div>
            `;

            overlay.classList.remove("hidden");

            modalContainer.innerHTML = modalHTML;
            
          
            document.addEventListener("keydown", e => {
                
                
                 if(e.keyCode == 39){
                     index = +index+1;
                    let { name, dob, phone, email, location: { city, street, state, postcode} , picture} = employees[index];
            
                    let date = new Date(dob.date);
        
                    const modalHTML = ` 
                    <img class="avatar" src="${picture.large}" />
                    <div class="text-container">
                        <h2 class="name">${name.first} ${name.last}</h2>
                        <p class="email">${email}</p>
                        <p class="address">${city}</p>
                        <hr />
                        <p>${phone}</p>
                        <p class="address">${street.number}, ${street.name}, ${state} ${postcode}</p>
                        <p>Birthday:
                    ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
                    </div>
                    `;
        
                    overlay.classList.remove("hidden");
        
                    modalContainer.innerHTML = modalHTML;
                    

                    
                    
                } else if(e.keyCode == 37) {
                    
                    index = +index-1;
                    let { name, dob, phone, email, location: { city, street, state, postcode} , picture} = employees[index];
            
                    let date = new Date(dob.date);
        
                    const modalHTML = ` 
                    <img class="avatar" src="${picture.large}" />
                    <div class="text-container">
                        <h2 class="name">${name.first} ${name.last}</h2>
                        <p class="email">${email}</p>
                        <p class="address">${city}</p>
                        <hr />
                        <p>${phone}</p>
                        <p class="address">${street.number}, ${street.name}, ${state} ${postcode}</p>
                        <p>Birthday:
                    ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
                    </div>
                    `;
        
                    overlay.classList.remove("hidden");
        
                    modalContainer.innerHTML = modalHTML;
                    
                } 
                 
            })
    }

    gridContainer.addEventListener('click', e => {
        
        if (e.target !== gridContainer) {
           
            const card = e.target.closest(".card");
            const index = card.getAttribute('data-index');
            
            displayModal(index);
        }
    });

    modalClose.addEventListener('click' , () => {
        overlay.classList.add("hidden");
        
    });

    function find(names){     
               search.addEventListener("input", e => {
                    let input = e.target.value.toUpperCase();
                    for(let ele of names){
                        let name = ele.innerHTML.toUpperCase().slice(0, input.length);

                         if(input !== name){
                             ele.parentNode.parentNode.classList.add("hidden")
                             console.log(ele.parentNode.parentNode)
                         } else if(input == "") {
                            ele.parentNode.parentNode.classList.remove("hidden");
                         }
                         
                  }
              })
            }
