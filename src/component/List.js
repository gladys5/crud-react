import React,{useEffect,useState} from 'react'
import axios from 'axios'

function List() {
    const[datos, setDatos]= useState([]); 
    const[first_name, setFirst_Name]= useState("");
    const[last_name,setLast_Name]= useState("");
    const[birthday, setBirthday]= useState("");
    const[email, setEmail]= useState("");
    const[password, setPassword]= useState("");
    const [validacionModificar, setValidacionModificar]= useState(false);
    const [idModificar, setIdModificar]= useState(0);
    
    useEffect(()=>{
        cargarDatos()
            }, []) 



  
    const cargarDatos= async()=>{
       const respuesta= await axios.get("https://users-crud1.herokuapp.com/users/")
       setDatos(respuesta.data)

    }

   


     const agregarUsuario = async(e)=>{
         e.preventDefault()
         await axios.post("https://users-crud1.herokuapp.com/users/", { 
         first_name,
          last_name,
         birthday,
         password,
          email 
       })
       cargarDatos()
     }

         const eliminarUsuario = async(id)=>{
             await axios.delete(`https://users-crud1.herokuapp.com/users/${id}`)
              cargarDatos()
           }
           const activarModificasion =async(id)=>{
               const respuesta=  await axios.get(`https://users-crud1.herokuapp.com/users/${id}`)
               //console.log(respuesta)
              setFirst_Name(respuesta.data.first_name)
              setLast_Name(respuesta.data.last_name)
                setBirthday(respuesta.data.birthday)
                setPassword(respuesta.data.password)
                setEmail (respuesta.data.email)
 

             setValidacionModificar(true)
             setIdModificar(id)
             
           }
           const modificarUsuario =async(e)=>{
               e.preventDefault()
               await axios.put(`https://users-crud1.herokuapp.com/users/${idModificar}`,
                {
                first_name,
                last_name,
                 birthday,
                 password,
                 email 
               })
               cargarDatos()
               setValidacionModificar(false)
           }

    return (


        <div>
            <h1 className='text-center'>CRUD  D USUARIOS</h1>
            <div className='row'>
                 <div >
                     <h3 className='text-center'>Lista de usuarios</h3>
                      <table className='table table-light'>
                                <thead>
                                    <tr>
                                        <td>Nombre</td>
                                        <td>Apellido</td>
                                        <td>Fecha</td>
                                        <td>Correo</td>
                                        <td>Password</td>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    datos.map((fila,index)=>(
                                    
                                    <tr key={fila.id}>
                                         <td>{index +1}</td>
                                        <td>{fila.first_name}</td>
                                        <td>{fila.last_name}</td>
                                        <td>{fila.birthday}</td>
                                        <td>{fila.email}</td>
                                        <td>{fila.password}</td>
                                        <td><button className='btn btn-warning btn-sm' onClick={()=>activarModificasion(fila.id)}>Modificar</button></td>
                                        <td><button className='btn btn-danger btn-sm'onClick={()=>eliminarUsuario(fila.id)}>Eliminar</button></td>

                                    </tr>
                                
                                    ))
                                    }
                                </tbody>         
                    </table>
                 </div> 
                 <div className='col-4'>
                      <h3 className='text-center'>FORMULARIO</h3>
                      
                      <form>
                          <div className='mb-3'>
                              <label className='form-label'>Nombre</label>
                              <input type='text'className='form-control'onChange={(e)=>setFirst_Name(e.target.value)}value={first_name}/>
                          </div>
                          <div className='mb-3'>
                              <label className='form-label'>Apellido</label>
                              <input type='text'className='form-control'onChange={(e)=>setLast_Name(e.target.value)}value={last_name}/>
                          </div>
                          <div className='mb-3'>
                              <label className='form-label'>Fecha</label>
                              <input type='date'className='form-control'onChange={(e)=>setBirthday(e.target.value)}value={birthday}/>
                          </div> 
                          <div className='mb-3'>
                              <label className='form-label'>Correo</label>
                              <input type='email'className='form-control'onChange={(e)=>setEmail(e.target.value)}value={email}/>
                          </div>
                          <div className='mb-3'>
                              <label className='form-label'>Password</label>
                              <input type='password'className='form-control'onChange={(e)=>setPassword(e.target.value)}value={"password"}/>
                          </div>
                            {validacionModificar ? (
                            <button className='btn btn-warning' onClick={(e)=>modificarUsuario(e)}>Modificar</button>
                            ):(
                             <button className='btn btn-success' onClick={(e)=>agregarUsuario(e)}>Agregar</button>)}
                           
                      </form>    
            </div>
          </div>
        </div>
    )
}

export default List
