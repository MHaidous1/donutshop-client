import React, {useState, useEffect} from 'react';
import styles from './Admin.module.css';

function Admin (){

    // eslint-disable-next-line
    {/* Use states */}
    const [donuts, setDonuts] = useState([]);
    const [newDonut, setNewDonut] = useState({name: '', description: '', price: '' });
    const [editDonut, setEditDonut] = useState(null);


    // eslint-disable-next-line
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
    
      
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Donut Master</h1>

            {/* Add Donut Form */}
            <form className={styles.form} onSubmit={addDonut}>
                <h2>Add New Donut</h2>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Name"
                    value={newDonut.name}
                    onChange={(e) => setNewDonut({ ...newDonut, name: e.target.value })}
                />
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Description"
                    value={newDonut.description}
                    onChange={(e) => setNewDonut({ ...newDonut, description: e.target.value })}
                />
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Price"
                    value={newDonut.price}
                    onChange={(e) => setNewDonut({ ...newDonut, price: e.target.value })}
                />
                <button className={styles.button} type="submit">Add Donut</button>
            </form>

            {/* Display Existing Donuts */}
            <h2>Existing Donuts</h2>
            <ul className={styles.list}>
                {donuts.map((donut) => (
                    <li className={styles.listItem} key={donut.ID}>
                        <strong>{donut.Name}</strong>
                        <p className={styles.description}>{donut.Description} (${donut.Price})</p>
                        <div>
                            <button className={styles.button} onClick={() => handleEditDonut(donut)}>Edit</button>
                            <button className={styles.button} onClick={() => deleteDonut(donut.ID)}>Delete</button>
                        </div>
                        <br />

                        {/* Conditionally Render Edit Form Under the Current Donut */}
                        {editDonut && editDonut.ID === donut.ID && (
                            <form className={styles.form} onSubmit={updateDonut}>
                                <h2>Edit Donut</h2>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="Name"
                                    value={editDonut.name}
                                    onChange={(e) => setEditDonut({ ...editDonut, name: e.target.value })}
                                />
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="Description"
                                    value={editDonut.description}
                                    onChange={(e) => setEditDonut({ ...editDonut, description: e.target.value })}
                                />
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="Price"
                                    value={editDonut.price}
                                    onChange={(e) => setEditDonut({ ...editDonut, price: e.target.value })}
                                />
                                <button className={styles.button} type="submit">Update Donut</button>
                                <button className={styles.button} type="button" onClick={() => setEditDonut(null)}>Cancel</button>
                            </form>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Admin;