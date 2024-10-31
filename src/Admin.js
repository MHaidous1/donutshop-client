import React, {useState, useEffect} from 'react';

function Admin (){

    const [donuts, setDonuts] = useState([]);
    const [newDonut, setNewDonut] = useState({name: '', description: '', price: '' });
    const [editDonut, setEditDonut] = useState(null);
    const getUrl = "http://localhost:8080/projects/donut-shop/server/getDonuts.php";
    const addUrl = "http://localhost:8080/projects/donut-shop/server/addDonuts.php";
    const deleteUrl = "http://localhost:8080/projects/donut-shop/server/deleteDonuts.php";

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
                        <button onClick={() => setEditDonut(donut)}>Edit</button>
                        <button onClick={() => deleteDonut(donut.ID)}>Delete</button>
                        </li>
                    ))}
                    </ul>
                    
            </div>
        
        </div>
    );
}

export default Admin;