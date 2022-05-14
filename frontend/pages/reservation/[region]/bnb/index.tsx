import { useCallback, useEffect, useState } from "react";
import Router from 'next/router';
import BnbItem from "../../../../components/reservation/bnbitem";
import { likeBnbList, bnbList } from "../../../../api/bnb";
import Header from "../../../../components/Header";
interface TypeBnb{
  id: number;
  contents: string;
  cooking: string;
  garden: string;
  loc: string;
  name: string;
  picPath: string;
}

const BnbList = () => {
  const region = Router.query.region;
  const [list, setList] = useState<Array<TypeBnb>>([]);
  const [like, setLike] = useState<number[]>([]);

  useEffect(() => {
    bnbList(
      region,
      (data: any) => {
        // console.log(data.data);
        setList(data.data);
      },
      (error: Error) => console.log(error)
    )
  }, [region]);


  useEffect(()=>{
    likeBnbList(
      null,
      (data: any) => {
        setLike(data.data);
        // console.log(data.data);
      }, 
      (error: Error) => console.log(error))
  },[])

  return (
    <div>
      <Header title={String(region)} hide={false} />
      <div>
        {list.map((bnb) => {
          return like.length !== 0 ? (
            <div key={bnb.id}>
              <BnbItem 
                name={bnb.name} 
                picPath={bnb.picPath}
                like={like}
                id={bnb.id}
              />
            </div>
          ) : <div key={bnb.id}>
                <BnbItem 
                  name={bnb.name} 
                  picPath={bnb.picPath}
                  id={bnb.id}
                />
              </div>
        })}
      </div>
    </div>
  )
};

export default BnbList;
