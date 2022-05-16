import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BnbItem from "../../../../components/reservation/bnbitem";
import { likeBnbList, bnbList } from "../../../../api/bnb";
import Header from "../../../../components/Header";
import styled from 'styled-components';
interface TypeBnb{
  id: number;
  contents: string;
  cooking: string;
  garden: string;
  loc: string;
  name: string;
  picPath: string;
};

const BnbList = () => {
  const router = useRouter();
  const region = router.query.region;
  const [list, setList] = useState<Array<TypeBnb>>([]);
  const [like, setLike] = useState<number[]>([]);

  useEffect(() => {
    bnbList(
      region,
      (data: any) => {
        setList(data.data);
        console.log(data.data)
      },
      (error: Error) => console.log(error)
    )
  }, [region]);


  useEffect(()=>{
    likeBnbList(
      null,
      (data: any) => {
        setLike(data.data);
      }, 
      (error: Error) => console.log(error))
  },[]);

  return (
    <div>
      <Header title={String(region)} hide={false} />
      <div>
        {list?.map((bnb) => (
          <div key={bnb.id}>
            <BnbItem 
              key={bnb.id}
              name={bnb.name} 
              picPath={bnb.picPath}
              like={like}
              id={bnb.id}
              loc={bnb.loc}
            />
          </div>
        ))}
      </div>
    </div>
  )
};

export default BnbList;
