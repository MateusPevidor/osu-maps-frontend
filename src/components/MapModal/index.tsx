import React, { useEffect, useState, useCallback } from 'react';

import {
  FiXCircle,
  FiExternalLink,
  FiCircle,
  FiClock,
  FiStar,
} from 'react-icons/fi';
import { BeatmapSet, Beatmap } from '../../interfaces/IBeatmap';

import {
  Container,
  ModalContainer,
  ImageContainer,
  TopContent,
  BottomContent,
  DiffsContainer,
  Diff,
  VisitWebsiteButton,
  MapInfoContainer,
  InfoItem,
} from './styles';

import { ReactComponent as Piano } from '../../assets/piano.svg';
import { ReactComponent as Metronome } from '../../assets/metronome.svg';
import { ReactComponent as Slider } from '../../assets/slider.svg';
import { ReactComponent as DiffCircle } from '../../assets/diffCircle.svg';

interface Props {
  isVisible: boolean;
  beatmap: BeatmapSet;
  setIsOpen: () => void;
}

const MapModal: React.FC<Props> = ({ isVisible, beatmap: bms, setIsOpen }) => {
  const [selectedDiff, setSelectedDiff] = useState(0);
  const [beatmap, setBeatmap] = useState<BeatmapSet>();

  useEffect(() => {
    if (bms) {
      setBeatmap(
        Object.assign(bms, {
          beatmaps: bms.beatmaps.sort(
            (a, b) => a.difficultyrating - b.difficultyrating,
          ),
        }),
      );
    }
    setSelectedDiff(0);
  }, [bms]);

  const handleLinkClick = useCallback((id: number) => {
    window.open(`https://osu.ppy.sh/b/${id}`, '_blank');
  }, []);

  const changeDifficulty = useCallback(index => {
    setSelectedDiff(index);
  }, []);

  const getTotalHitObjects = useCallback((_beatmap: Beatmap) => {
    return (
      _beatmap.count_normal + _beatmap.count_slider + _beatmap.count_spinner
    );
  }, []);

  const getColorByDiff = useCallback((diff: number): string => {
    if (diff < 1) return '#00f';
    if (diff < 2.3) return '#0f0';
    if (diff < 4) return '#ff0';
    if (diff < 5.6) return '#f00';
    if (diff < 7) return '#f0f';
    return '#000';
  }, []);

  const getSliderPercentage = useCallback(
    (_beatmap: Beatmap) => {
      return (_beatmap.count_slider / getTotalHitObjects(_beatmap)) * 100;
    },
    [getTotalHitObjects],
  );

  const secondsToMinutesAndSeconds = useCallback(time => {
    const minutes = Math.floor(time / 60);
    const seconds =
      time - minutes * 60 < 10
        ? `0${time - minutes * 60}`
        : time - minutes * 60;
    return `${minutes}:${seconds}`;
  }, []);

  return (
    <>
      {beatmap && beatmap.beatmaps.length > 0 && (
        <Container isVisible={isVisible}>
          <ModalContainer>
            <ImageContainer
              imageURL={`https://assets.ppy.sh/beatmaps/${beatmap.beatmapset_id}/covers/cover.jpg`}
            >
              <TopContent>
                <div>
                  <p>{`${beatmap.beatmaps[selectedDiff].artist} - ${beatmap.beatmaps[selectedDiff].title} [${beatmap.beatmaps[selectedDiff].version}]`}</p>
                  <p>{beatmap.beatmaps[selectedDiff].creator}</p>
                </div>
                <FiXCircle onClick={setIsOpen} />
              </TopContent>
              <BottomContent>
                <DiffsContainer>
                  {beatmap.beatmaps.map((bm, index) => (
                    <Diff
                      color={getColorByDiff(bm.difficultyrating)}
                      key={bm.beatmap_id}
                      onClick={() => changeDifficulty(index)}
                    >
                      <DiffCircle />
                    </Diff>
                  ))}
                </DiffsContainer>
                <VisitWebsiteButton
                  onClick={() =>
                    handleLinkClick(beatmap.beatmaps[selectedDiff].beatmap_id)
                  }
                >
                  <p>Visit website</p>
                  <FiExternalLink />
                </VisitWebsiteButton>
              </BottomContent>
            </ImageContainer>
            <MapInfoContainer>
              <div>
                <InfoItem>
                  <Piano />
                  <p>{`Keys: ${beatmap.beatmaps[selectedDiff].diff_size}`}</p>
                </InfoItem>
                <InfoItem>
                  <FiClock />
                  <p>
                    {`Length: ${secondsToMinutesAndSeconds(
                      beatmap.beatmaps[selectedDiff].total_length,
                    )} (${secondsToMinutesAndSeconds(
                      beatmap.beatmaps[selectedDiff].hit_length,
                    )})`}
                  </p>
                </InfoItem>
                <InfoItem>
                  <Metronome />
                  <p>{`BPM: ${beatmap.beatmaps[selectedDiff].bpm}`}</p>
                </InfoItem>
              </div>
              <div>
                <InfoItem>
                  <p>
                    {`HitObjects: ${getTotalHitObjects(
                      beatmap.beatmaps[selectedDiff],
                    )}`}
                  </p>
                  <FiCircle />
                </InfoItem>
                <InfoItem>
                  <p>
                    {`Sliders: ${getSliderPercentage(
                      beatmap.beatmaps[selectedDiff],
                    ).toFixed(2)}%`}
                  </p>
                  <Slider />
                </InfoItem>
                <InfoItem>
                  <p>
                    {`Stars: ${beatmap.beatmaps[
                      selectedDiff
                    ].difficultyrating.toFixed(2)}`}
                  </p>
                  <FiStar fill="#fd3f55" />
                </InfoItem>
              </div>
            </MapInfoContainer>
          </ModalContainer>
        </Container>
      )}
    </>
  );
};

export default MapModal;
