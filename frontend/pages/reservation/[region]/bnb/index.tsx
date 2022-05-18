import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
};

const BnbList = () => {
  const router = useRouter();
  const region = router.query.region;
  const [list, setList] = useState<Array<TypeBnb>>([]);
  const [like, setLike] = useState<number[]>([]);

  useEffect(() => {
    if (region === '제주도') {
      bnbList(
        '제주특별자치도',
        ({ data }: any) => {
          setList(data);
          console.log(data)
        },
        (error: Error) => console.log(error)
      )
    } else if (region==='강원도') {
      bnbList(
        '강원',
        ({ data }: any) => {
          setList(data);
          console.log(data)
        },
        (error: Error) => console.log(error)
      )
    } else if (region==='전라남도') {
      bnbList(
        '전남',
        ({ data }: any) => {
          setList(data);
          console.log(data)
        },
        (error: Error) => console.log(error)
      )
    } else if (region==='전라북도') {
      bnbList(
        '전북',
        ({ data }: any) => {
          setList(data);
          console.log(data)
        },
        (error: Error) => console.log(error)
      )
    }
    else if (region==='경상남도') {
      bnbList(
        '경남',
        ({ data }: any) => {
          setList(data);
          console.log(data)
        },
        (error: Error) => console.log(error)
      )
    }
    else if (region==='경상북도') {
      bnbList(
        '경북',
        ({ data }: any) => {
          setList(data);
          console.log(data)
        },
        (error: Error) => console.log(error)
      )
    }
    else if (region==='충청남도') {
      bnbList(
        '충남',
        ({ data }: any) => {
          setList(data);
          console.log(data)
        },
        (error: Error) => console.log(error)
      )
    }
    else if (region==='충청북도') {
      bnbList(
        '충북',
        ({ data }: any) => {
          setList(data);
          console.log(data)
        },
        (error: Error) => console.log(error)
      )
    } else {
      bnbList(
        region,
        ({ data }: any) => {
          setList(data);
          console.log(data)
        },
        (error: Error) => console.log(error)
      )
    }
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
    <div style={{marginBottom: '13vh'}}>
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
