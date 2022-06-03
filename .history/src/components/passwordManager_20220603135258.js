import React, { useContext, useEffect, useState } from 'react'
import web3Context from '../Context/web3Context'
import { Contract } from 'ethers';
import abi from "../abi/Account.json"
import { Button, CircularProgress, Card} from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import PasswordCard from './PasswordCard';
export default function PasswordManager({state_account,setAccount}) {

    const web3 = useContext(web3Context);
    const [listPassword, setListPassword] = useState();
    const [loading, setLoading] = useState (true);

   async function fetchPassword()
    {
        const contract = new Contract(state_account,abi,web3.ref_provider.current.getSigner());
        setListPassword(await contract.getlistPassword());
        setLoading(false);
    }

    useEffect(()=>{
      fetchPassword();
    },[])
  return (
    <div className='p-5'>

      <Card variant="outlined" className='p-5'>
      <div className='w-full'>

        <Card className='p-5 flex items-center ' variant="outlined">
        <span className='font-Concert'> Your Contract Account :  </span>
           <span className='font-Cairo mx-2'>{state_account}</span> 


            <a
                href={web3.ref_explorer.current + "/address/" + web3.state_address}
                target="_blank"
                rel="noreferrer"
                className="no-underline mx-3 flex justify-center items-center"
              >
               
        <Button
        size='small'
        
        variant="contained"
        className="bg-cyan-300 hover:bg-blue-500 mx-2  font-Concert hover:transform hover:scale-105 font-Cairos text-xs"
        startIcon={<ExploreIcon></ExploreIcon>}
      >
        Explorer
      </Button>
              </a>
        </Card>
         
        </div>
        <div className='flex justify-center w-full items-center flex-wrap my-10'>
        {loading && <CircularProgress></CircularProgress>}
        {!loading && listPassword && listPassword.map(password => <PasswordCard className="m-2" password={password}></PasswordCard> )}
     
        </div>
      </Card>

    </div>
  )
}
