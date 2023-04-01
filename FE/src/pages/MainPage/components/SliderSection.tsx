import { useState, Fragment } from 'react';
import * as S from './SliderSection.style';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import SliderItem from './SliderItem';
import useActiveParties from '../../../queries/useActivePartyQuery';
import useUser from '../../../queries/useUserQuery';
import { useLikedNumArr } from './../../../queries/party/useLikedNumArr';

export default function SimpleSlider() {
  const showMaxCnt = 3;
  const { data: activeParties, isSuccess: fetchingActivePartySuccess } = useActiveParties();
  const { data: user, isSuccess: fetchingUserSuccess } = useUser();

  const res = useLikedNumArr(activeParties);

  const settings = {
    dots: false,
    className: 'center',
    centerPadding: '0px',
    centerMode: true,
    infinite:
      fetchingActivePartySuccess &&
      activeParties.filter((party) => res.get(party.partyId) !== party.partyLimit).length >
        showMaxCnt,
    speed: 500,
    slidesToShow: showMaxCnt,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    draggable: true,
    nextArrow: (
      <S.DivNext>
        <MdKeyboardArrowRight />
      </S.DivNext>
    ),
    prevArrow: (
      <S.DivPre>
        <MdKeyboardArrowLeft />
      </S.DivPre>
    ),
    beforeChange: (current: number, next: number) => setSlideIndex(next),
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const [slideIndex, setSlideIndex] = useState(0);

  return (
    <Fragment>
      {fetchingActivePartySuccess && (
        <S.Div
          length={
            activeParties.filter((party) => res.get(party.partyId) !== party.partyLimit).length
          }
          max={showMaxCnt}>
          {fetchingUserSuccess ? (
            <S.TitleBox>
              밥메이트들이 <span style={{ color: '#E59A59' }}>{user.name}</span>님을 기다리고
              있어요!
            </S.TitleBox>
          ) : (
            <div className="login_msg">로그인 후 이용해주세요!</div>
          )}
          <div>
            {activeParties.length === 0 && (
              <S.LabelContainer>
                <div>활성화된 식당이 없습니다.</div>
              </S.LabelContainer>
            )}
            {activeParties.length >= 4 && (
              <S.StyledSlider {...settings}>
                {activeParties
                  .filter((party) => res.get(party.partyId) !== party.partyLimit)
                  .map((party, index) => (
                    <div key={party.partyId}>
                      <SliderItem
                        key={party.partyId}
                        index={index}
                        slideIndex={slideIndex}
                        party={party}
                      />
                    </div>
                  ))}
              </S.StyledSlider>
            )}
            {activeParties.length <= 3 && (
              <div>
                {activeParties
                  .filter((party) => res.get(party.partyId) !== party.partyLimit)
                  .map((party, index) => (
                    <div key={party.partyId}>
                      <SliderItem
                        key={party.partyId}
                        index={index}
                        slideIndex={slideIndex}
                        party={party}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </S.Div>
      )}
    </Fragment>
  );
}
