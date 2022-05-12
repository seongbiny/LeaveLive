import { useCallback, useEffect, useState } from "react";
import Router from 'next/router';
import BnbItem from "../../../../components/reservation/bnbitem";
import { likeBnbList, bnbList } from "../../../../api/bnb";
import Header from "../../../../components/Header";
import { useAppSelector, useAppDispatch } from "../../../../util/bookmarkHooks";
import { setIsbookmark } from "../../../../store/slices/bookmarkSlice";
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
  const [like, setLike] = useState([]);
  const dispatch = useAppDispatch();
  const likelist: number[] = [];

  useEffect(() => {

    bnbList(
      region,
      (data: any) => {
        console.log(data.data);
        setList(data.data);
      },
      (error: Error) => console.log(error)
    )

  }, [region]);


  useEffect(()=>{
    likeBnbList(
      null,
      (data: any) => {
        console.log(data.data);
        // setLike(data.data);
        // dispatch(setIsbookmark(likelist));
      }, 
      (error: Error) => console.log(error))

    // const handleLike = () => {
    //   for (let i of like){
    //     if (!(i.accommodationArticle.id in likelist)){
    //       likelist.push(i.accommodationArticle.id)
    //     }
    //     console.log(i)
    //   }
    // }
    // handleLike();
    // console.log(likelist)

  },[])

  return (
    <div>
      <Header title={String(region)} hide={false} />
      <div>
        {list.map((bnb) => {
          return likelist.length !== 0 ? (
            <div key={bnb.id}>
              <BnbItem 
                name={bnb.name} 
                picpath={bnb.picPath}
                likelist={likelist}
                id={bnb.id}
              />
            </div>
          ) : <div>
                <BnbItem 
                  name={bnb.name} 
                  picpath={bnb.picPath}
                  id={bnb.id}
                />
              </div>
        })}
      </div>

    </div>
  )
};

export default BnbList;
