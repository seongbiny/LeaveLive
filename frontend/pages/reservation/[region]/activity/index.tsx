
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import ActivityItem from '../../../../components/reservation/activityItem';
import Header from "../../../../components/Header";
import { activityList, likeActivityList } from '../../../../api/activity';
import Seo from "../../../../components/Seo";

interface TypeAct{
  id: number,
  contents: string,
  loc: string,
  name: string,
  picContents: string,
  picPath: string,
  price: number
}

const ActivityList = () => {
  const router = useRouter();
  const region = router.query.region;
  const [list, setList] = useState<Array<TypeAct>>([]);
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
    likeActivityList(
      null,
      (data: any) => {
        setLike(data.data);
      },
      (error: Error) => console.log(error)
    );
  },[])

  useEffect(() => {
    activityList(
      convertKeyword(String(region)),
      ({ data }: any) => {
        setList(data);
      },
      (error: Error) => console.log(error)
    )
  },[region])

  return (
    <div>
      <Seo title="액티비티" />
      <Header title={String(region)} hide={false} />
      <div>
        {list?.map((act) => (
          <ActivityItem
            key={act.id}
            name={act.name}
            picPath={act.picPath}
            actId={act.id}
            picContent={act.picContents}
            price={act.price}
            like={like}
            loc={act.loc}
          />
        ))}
      </div>
    </div>
  )
};

export default ActivityList;
