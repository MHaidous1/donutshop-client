import React, {useState, useEffect} from 'react';

function Admin (){

    {/* Use states */}
    const [donuts, setDonuts] = useState([]);
    const [newDonut, setNewDonut] = useState({name: '', description: '', price: '' });
    const [editDonut, setEditDonut] = useState({
        name:'',
        description:'',
        price: ''
    });

    {/* Links */}
    const getUrl = "http://localhost:8080/projects/donut-shop/server/getDonuts.php";
    const addUrl = "http://localhost:8080/projects/donut-shop/server/addDonuts.php";
    const deleteUrl = "http://localhost:8080/projects/donut-shop/server/deleteDonuts.php";
    const updateUrl = "http://localhost:8080/projects/donut-shop/server/updateDonuts.php";

    useEffect(() => {
        fetchDonuts();
    }, []);

    const fetchDonuts = async () => {
        try{
            const response = await fetch(getUrl);
            const data = await response.json();
            setDonuts(data);
        } catch (error){
            console.error('Error fetching donuts: ', error);
        }
    };


    //Function to add a donut
    const addDonut = async (e) => {

        e.preventDefault();

        try{

            await fetch(addUrl,{
                
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newDonut),
            });
            fetchDonuts(); //Refreshing list
            setNewDonut({name: '', description: '', price: ''});

        } catch (error){
            console.error('Error adding donut: ', error);
        }
    };

    //Function to delete a donut
    const deleteDonut = async (id) => {
        try{

            await fetch(deleteUrl,{
                
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id}),
            });
            fetchDonuts(); //Refreshing list

        } catch (error){
            console.error('Error deleting donut: ', error);
        }
    };

    //Function to update Donut
    const updateDonut = async (e) => {
        e.preventDefault();
        try {
            await fetch(updateUrl, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: editDonut.ID,  // Ensure this is the correct ID property
                    name: editDonut.name,
                    description: editDonut.description,
                    price: editDonut.price,
                }),
            });
            fetchDonuts(); // Refresh the list
            setEditDonut(null); // Close edit form
        } catch (error) {
            console.error("Error updating donut:", error);
        }
    };
    
      

    const handleEditDonut = (donut) => {
        setEditDonut({
            ID: donut.ID,  
            name: donut.Name || '',
            description: donut.Description || '',
            price: donut.Price || '',
        });
    };
    
      
    return(
        <div>
            <h1>Admin - Manage Donuts</h1>

            <div>
            
                {/* Add donut Form */}
                <form onSubmit={addDonut}>
                    <h2>Add New Donut</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={newDonut.name}
                        onChange={(e) => setNewDonut({ ...newDonut, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newDonut.description}
                        onChange={(e) => setNewDonut({ ...newDonut, description: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Price"
                        value={newDonut.price}
                        onChange={(e) => setNewDonut({ ...newDonut, price: e.target.value })}
                    />
                    <button type="submit">Add Donut</button>
                    </form>

                    {/* Displaying existing donuts*/}
                    <h2>Existing Donuts</h2>
                    <ul>
                    {donuts.map((donut) => (
                        <li key={donut.ID}>
                        <strong>{donut.Name}</strong> - {donut.Description} (${donut.Price})
                        <button onClick={() => handleEditDonut(donut)}>Edit</button>
                        <button onClick={() => deleteDonut(donut.ID)}>Delete</button>
                        </li>
                    ))}
                    </ul>
                    
                    {editDonut && (
                        <form onSubmit={updateDonut}>
                          <h2>Edit Donut</h2>
                          <input
                            type="text"
                            placeholder="Name"
                            value={editDonut.name}
                            onChange={(e) => setEditDonut({ ...editDonut, name: e.target.value })}
                          />
                          <input
                            type="text"
                            placeholder="Description"
                            value={editDonut.description}
                            onChange={(e) => setEditDonut({ ...editDonut, description: e.target.value })}
                          />
                          <input
                            type="text"
                            placeholder="Price"
                            value={editDonut.price}
                            onChange={(e) => setEditDonut({ ...editDonut, price: e.target.value })}
                          />
                          <button type="submit">Update Donut</button>
                        </form>
                    )}
                      
            </div>
        
        </div>
    );
}

export default Admin;