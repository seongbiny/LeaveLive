import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import BnbItem from "../../../../components/reservation/bnbitem";
import { likeBnbList, bnbList } from "../../../../api/bnb";
import Header from "../../../../components/Header";
import Seo from '../../../../components/Seo';
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

  const convertKeyword = useCallback((region: String): String => {
    let keyword: String = region;

    if (region === "제주도") {
      keyword = "제주특별자치도";
    } else if (region === "강원도") {
      keyword = "강원";
    } else if (region === "전라남도") {
      keyword = "전남";
    } else if (region === "전라북도") {
      keyword = "전북";
    } else if (region === "경상남도") {
      keyword = "경남";
    } else if (region === "경상북도") {
      keyword = "경북";
    } else if (region === "충청남도") {
      keyword = "충남";
    } else if (region === "충청북도") {
      keyword = "충북";
    }

    return keyword;
  },[])

  useEffect(() => {
    bnbList(
      convertKeyword(String(region)),
      ({ data }: any) => {
        setList(data);
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
    <div style={{marginBottom: '13vh'}}>
      <Seo title="숙소목록" />
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
