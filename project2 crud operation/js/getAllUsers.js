let usersArray = [];

async function getAllUser() {
    try 
    {
        const localUsers = localStorage.getItem('users');
        if (localUsers) 
        {
            usersArray = JSON.parse(localUsers);
            displayUsers(usersArray);
        }
        else 
        {
            const response = await fetch('https://dummyjson.com/users');
            const data = await response.json();
            if (response.ok) 
            {
                usersArray = data.users;
                localStorage.setItem('users', JSON.stringify(usersArray));
                displayUsers(usersArray);
            } 
            else 
            {
                console.log("error");
                alert("Please try again.");
            }
        }
    } 
    catch (error) 
    {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
}

async function displayUsers(users) {
    document.getElementById('userCount').innerHTML = users.length;
    const userList = document.getElementById("data");
    userList.innerHTML = '';
  
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');

        userDiv.innerHTML = `
            <div class="container-1">
                <img src="${user.image}" alt="user image">
                <div class="container-data">
                    
                    <p>${user.phone} <i class="fa-solid fa-square-phone-flip"></i></p>
                    <p>${user.email} <i class="fa-duotone fa-solid fa-square-envelope"></i></p>
                </div>
            </div>
            
            <div class="container-2">
                <p><i class="fa-solid fa-user"></i> ${user.firstName} ${user.lastName}</p>
                <p><i class="fa-solid fa-cake-candles"></i> ${user.birthDate}</p>
                <p><i class="fa-solid fa-location-dot"></i> ${user.address.address}</p>
            </div>

            <div class="container-3">
                <p>Gender: <span>${user.gender}</span></p>
                <p class="age">Age: <span>${user.age}</span></p>
            </div>

            <div class="container-button">
                <button class="button-blue" onclick="editUser(${user.id})">Edit</button>
                <button class="button-red" onclick="deleteUser(${user.id})">Delete</button>
            <div>

            
        `;
        userList.appendChild(userDiv);
    });
}

//Edit User Code
function openModal(user) {
    document.getElementById('editUserId').value = user.id;
    document.getElementById('editImageUrl').value = user.image;
    document.getElementById('editFirstName').value = user.firstName;
    document.getElementById('editLastName').value = user.lastName;
    document.getElementById('editPhoneNumber').value = user.phone;
    document.getElementById('editEmail').value = user.email;
    document.getElementById('editAddress').value = user.address.address;
    document.getElementById('editDateOfBirth').value = user.birthDate;
    document.getElementById('editAge').value = user.age;
    document.getElementById('editGender').value = user.gender;

    document.getElementById('editModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

async function handleFormSubmit(event) {
    event.preventDefault();
    const formId = event.target.id;

    if (formId === 'userEditForm'){
        const userId = document.getElementById('editUserId').value;
        const imageUrl = document.getElementById('editImageUrl').value;
        const firstName = document.getElementById('editFirstName').value;
        const lastName = document.getElementById('editLastName').value;
        const phoneNumber = document.getElementById('editPhoneNumber').value;
        const email = document.getElementById('editEmail').value;
        const address = document.getElementById('editAddress').value;
        const dateOfBirth = document.getElementById('editDateOfBirth').value;
        const age = document.getElementById('editAge').value;
        const gender = document.getElementById('editGender').value;

        try{
            const response = await fetch(`https://dummyjson.com/users/${userId}`, {
                method: 'PUT', /* or PATCH */
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image: imageUrl,
                    firstName: firstName,
                    lastName: lastName,
                    phone: phoneNumber,
                    email: email,
                    address: {
                        address: address
                    },
                    birthDate: dateOfBirth,
                    age: age,
                    gender: gender
                })
            });
            
            const data = await response.json();
            console.log(data);
            if(response.ok)
            {
                const userIndex = usersArray.findIndex(user => user.id === parseInt(userId));
                if (userIndex !== -1) {
                    usersArray[userIndex] = {
                        ...usersArray[userIndex],
                        image: imageUrl,
                        firstName: firstName,
                        lastName: lastName,
                        phone: phoneNumber,
                        email: email,
                        address: {
                            address: address
                        },
                        birthDate: dateOfBirth,
                        age: age,
                        gender: gender
                    };
                    localStorage.setItem('users', JSON.stringify(usersArray));
                    displayUsers(usersArray);
                    closeModal();
                }
            }

            else{
                alert("Please try again.");
            }
        }
        catch(error)
        {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    }
    else if(formId === 'userDeleteForm')
    {
        const userId = document.getElementById('deleteUserId').value;
        try{
            const response = await fetch(`https://dummyjson.com/users/${userId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if(response.ok)
            {
                const userIndex = usersArray.findIndex(user => user.id === parseInt(userId));
                if (userIndex !== -1) 
                {
                    usersArray.splice(userIndex, 1);
                    localStorage.setItem('users', JSON.stringify(usersArray));
                    displayUsers(usersArray);
                    closeDeleteModal();
                }
            }
            else
            {
                alert("Please try again.");
            }
        }
        catch(error){
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    }

    else if (formId === 'searchForm') {
        try
        {        
            const name = document.getElementById("search").value;
            console.log(name);
        
            const user = usersArray.find(user => user.firstName === name);
            
            let searchArray = [];
            if (user) {
                searchArray.push(user);
                displayUsers(searchArray);
            } else {
                displayUsers(searchArray);
                console.error('User not found');
                alert("User Not Found",console.error);
            }
        }
        catch(error)
        {
            alert(error);
        }
        
    }

    else if (formId === 'addUserForm'){
        const imageUrl = document.querySelector('input[name="imageUrl"]').value;
        const firstName = document.querySelector('input[name="firstName"]').value;
        const lastName = document.querySelector('input[name="lastName"]').value;
        const phoneNumber = document.querySelector('input[name="phoneNumber"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const address = document.querySelector('input[name="address"]').value;
        const dateOfBirth = document.querySelector('input[name="dateOfBirth"]').value;
        const age = document.querySelector('input[name="age"]').value;
        const gender = document.querySelector('select[name="gender"]').value;
        
        try{
            const newUser = {
                id: usersArray.length + 1,
                image: imageUrl,
                firstName: firstName,
                lastName: lastName,
                phone: phoneNumber,
                email: email,
                address: {
                    address: address
                },
                birthDate: dateOfBirth,
                age: parseInt(age),
                gender: gender
            };
            addUserToArray(newUser);

            fetch('https://dummyjson.com/users/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: usersArray.length + 1,
                    image: imageUrl,
                    firstName: firstName,
                    lastName: lastName,
                    phone: phoneNumber,
                    email: email,
                    address: {
                        address: address
                    },
                    birthDate: dateOfBirth,
                    age: parseInt(age),
                    gender: gender
                })
              })
              .then(res => res.json())
              .then(console.log);
        }
        catch(error){
            alert(error);
        }
    }
}

function addUserToArray(user) {
    usersArray.push(user);
    localStorage.setItem('users', JSON.stringify(usersArray));
    displayUsers(usersArray);
    alert("User added successfully!");

    document.getElementById('addUserForm').reset();
}

function editUser(userId) {
    const user = usersArray.find(user => user.id === userId);
    if (user) {
        openModal(user);
    } else {
        console.error('User not found');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getAllUser();

    const userEditForm = document.getElementById('userEditForm');
    const userDeleteForm = document.getElementById('userDeleteForm');
    const searchForm = document.getElementById('searchForm');
    const addUserForm = document.getElementById('addUserForm');

    if (userEditForm) {
        userEditForm.addEventListener('submit', handleFormSubmit);
    } else {
        console.error('userEditForm not found');
    }

    if (userDeleteForm) {
        userDeleteForm.addEventListener('submit', handleFormSubmit);
    } else {
        console.error('userDeleteForm not found');
    }

    if (searchForm) {
        searchForm.addEventListener('submit', handleFormSubmit);
    } else {
        console.error('searchForm not found');
    }

    if (addUserForm) {
        addUserForm.addEventListener('submit', handleFormSubmit);
    } else {
        console.error('addUserForm not found');
    }

    const closeModalButton = document.querySelector('.close');
    const cancelEditButton = document.getElementById('cancelEdit');
    const closeDeleteButton = document.querySelector('.closeDelete');
    const cancelDeleteButton = document.getElementById('cancelDelete');

    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    } else {
        console.error('.close button not found');
    }

    if (cancelEditButton) {
        cancelEditButton.addEventListener('click', closeModal);
    } else {
        console.error('#cancelEdit button not found');
    }

    if (closeDeleteButton) {
        closeDeleteButton.addEventListener('click', closeDeleteModal);
    } else {
        console.error('.closeDelete button not found');
    }

    if (cancelDeleteButton) {
        cancelDeleteButton.addEventListener('click', closeDeleteModal);
    } else {
        console.error('#cancelDelete button not found');
    }
});


//Delete User Code
function deleteUser(userId){
    const user = usersArray.find(user => user.id === userId);
    if (user) {
        openDeleteModal(user);
    } else {
        console.error('User not found');
    }
}

function openDeleteModal(user){  
    document.getElementById('deleteModal').style.display = 'block';
    document.getElementById("deleteUserId").value = user.id;
    document.getElementById("deletefirstName").value = user.firstName + " " + user.lastName;
}

function closeDeleteModal() {
    document.getElementById('deleteModal').style.display = 'none';
}