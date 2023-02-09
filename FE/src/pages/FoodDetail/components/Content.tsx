import SelectTags from './SelectTags';
import { useState, useContext, useEffect } from 'react';
import React from 'react';
import { postParty } from '../foodDetailApi';
import { SocketContext } from '../../../socket/SocketContext';
import { Shops } from '../../../type/shopType';
import * as S from '../styles/contentStyle';
import useUser from './../../../queries/useUserQuery';
import useActiveParties from './../../../queries/useActivePartyQuery';
import useMyParties from './../../../queries/useMyPartiesQuery';

interface Contentype {
  shop: Shops;
}

const Content = ({ shop }: Contentype) => {
  const [partyLimit, setpartyLimit] = useState<number>(2);
  const BASE_URL = 'https://map.naver.com/v5/entry/place/';
  const socket = useContext(SocketContext);
  const { data: user, isSuccess: isUserSuccess } = useUser();
  const { data: activePartyList, isSuccess: isActivePartiesSuccess } = useActiveParties();
  const [isJoined, setIsJoined] = useState(false);

  const { data: myPartyList, isSuccess: isMyPartiesSuccess } = useMyParties();
  const [gathering, setGathering] = useState(false);
  const currentParty = activePartyList
    ?.filter((party) => party.likedNum !== party.partyLimit)
    .find((party) => party.shopId === shop.shopId);

  useEffect(() => {
    if (currentParty) {
      setGathering(true);
    } else {
      setGathering(false);
    }
  }, [activePartyList]);

  useEffect(() => {
    if (isMyPartiesSuccess && myPartyList.find((myParty) => myParty.shopId === shop.shopId)) {
      setIsJoined(true);
    } else {
      setIsJoined(false);
    }
  }, [myPartyList]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const party = {
      shopId: shop.shopId,
      partyLimit,
      timeLimit: 30,
    };
    const message = await postParty(party);
    if (message) {
      socket.emit('createParty', '생성요청');
      alert('식당모임이 생성되었습니다.');
    }
  };

  const clickJoinButton = (partyId: number) => {
    if (isUserSuccess) socket.emit('joinParty', partyId, user?.userId);
  };

  return (
    <S.ContentContainer>
      <S.TitleContainer>
        <S.Title>
          {shop.name}({shop.category})
        </S.Title>
        {!gathering && !isJoined && (
          <S.LikeButton
            variant="contained"
            onClick={handleClick}
            sx={{
              fontSize: '20px',
              marginRight: '30px',
            }}>{`모임 생성`}</S.LikeButton>
        )}
        {gathering && !isJoined && (
          <S.LikeButton
            variant="contained"
            onClick={() => clickJoinButton(currentParty?.partyId as number)}
            sx={{
              fontSize: '20px',
              marginRight: '30px',
            }}>{`모임 참여`}</S.LikeButton>
        )}
        {isJoined && <p>참여중</p>}
      </S.TitleContainer>

      <S.MenuContainer>
        <S.MenuCard size={'15px'} width={'20vw'}>
          <p className="description">{shop.description}</p>
          <p>{`거리 : 걸어서 ${shop.distance}분 거리`}</p>
          <S.ATag href={`${BASE_URL}${shop.address}`} target="_blank" rel="noreferrer">
            지도 보기
          </S.ATag>
        </S.MenuCard>
        <S.SelectContainer>
          <SelectTags type={'모집인원'} value={partyLimit} setValue={setpartyLimit} />
        </S.SelectContainer>
      </S.MenuContainer>
    </S.ContentContainer>
  );
};

export default React.memo(Content);
