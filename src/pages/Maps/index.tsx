import React, { useState, useEffect, useCallback, useMemo } from 'react';

import { FiExternalLink, FiStar } from 'react-icons/fi';
import { useSearch } from '../../hooks/search';

import Header from '../../components/Header';
import MapModal from '../../components/MapModal';

import { CardsContainer, Card, CoverImage, InfoContainer } from './styles';

import api from '../../services/api';
import { filterBeatmap } from '../../utils/wordFilter';

import { BeatmapSet, Beatmap } from '../../interfaces/IBeatmap';

const Maps: React.FC = () => {
  const [beatmaps, setBeatmaps] = useState<BeatmapSet[]>([]);
  const [filteredBeatmaps, setFilteredBeatmaps] = useState<BeatmapSet[]>([]);
  const [selectedBeatmap, setSelectedBeatmap] = useState(0);

  const { getSearchText } = useSearch();

  useEffect(() => {
    const words = getSearchText().toUpperCase().split(' ');

    setFilteredBeatmaps(
      beatmaps
        .map(beatmapset => {
          const filteredDiffs = beatmapset.beatmaps.filter(diff => {
            const diffText = `${diff.artist} ${diff.title} ${diff.creator} ${diff.version}`.toUpperCase();
            const contains = words.filter(word => {
              if (filterBeatmap(word, diff)) {
                return true;
              }
              return diffText.includes(word);
            });
            return contains.length === words.length;
          });
          if (filteredDiffs.length > 0) {
            const copy = {
              ...beatmapset,
              beatmaps: filteredDiffs,
            } as BeatmapSet;
            return copy;
          }
          return {
            beatmapset_id: 0,
            low_diff: 0,
            high_diff: 0,
            beatmaps: [],
          };
        })
        .filter(beatmapset => beatmapset.beatmapset_id !== 0),
    );
  }, [getSearchText, beatmaps]);

  useEffect(() => {
    api
      .get('/beatmaps')
      .then(response => {
        const beatmapDiffs = response.data as Beatmap[];
        // console.log(beatmapDiffs);
        beatmapDiffs.sort((a, b) => a.beatmapset_id - b.beatmapset_id);

        const beatmapsets = new Array<BeatmapSet>();
        const final = beatmapDiffs.reduce(
          (acc, diff) => {
            // console.log(diff.beatmapset_id, acc.beatmapset_id);
            if (diff.beatmapset_id !== acc.beatmapset_id) {
              if (acc.beatmapset_id !== 0) {
                // console.log('set', acc);
                beatmapsets.push({
                  beatmapset_id: acc.beatmapset_id,
                  high_diff: acc.high_diff,
                  low_diff: acc.low_diff,
                  beatmaps: acc.beatmaps,
                });
                // console.log('set');
              }
              acc.beatmapset_id = diff.beatmapset_id;
              acc.high_diff = 0;
              acc.low_diff = 20;
              acc.beatmaps = new Array<Beatmap>();
            }
            acc.low_diff =
              acc.low_diff > diff.difficultyrating
                ? Number(diff.difficultyrating.toFixed(2))
                : acc.low_diff;
            acc.high_diff =
              acc.high_diff < diff.difficultyrating
                ? Number(diff.difficultyrating.toFixed(2))
                : acc.high_diff;
            acc.beatmaps.push(diff);
            return acc;
          },
          {
            beatmapset_id: 0,
            low_diff: 20,
            high_diff: 0,
            beatmaps: new Array<Beatmap>(),
          },
        );
        beatmapsets.push(final);
        // console.log(beatmapsets);
        setBeatmaps(beatmapsets);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleLinkClick = useCallback((id: number) => {
    window.open(`https://osu.ppy.sh/s/${id}?m=0`, '_blank');
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const handleBeatmapClick = useCallback(
    id => {
      setSelectedBeatmap(id);
      openModal();
    },
    [openModal],
  );

  return (
    <>
      <MapModal
        isVisible={modalOpen}
        beatmap={filteredBeatmaps[selectedBeatmap]}
        setIsOpen={openModal}
      />
      <Header isFixed />

      <CardsContainer>
        {filteredBeatmaps.map((beatmap, index) => (
          <Card key={beatmap.beatmapset_id}>
            <CoverImage
              src={`https://b.ppy.sh/thumb/${beatmap.beatmapset_id}l.jpg`}
              onClick={() => handleBeatmapClick(index)}
            />
            <InfoContainer>
              <div>
                <FiStar />
                <p>
                  {`${beatmap.low_diff.toFixed(
                    2,
                  )} - ${beatmap.high_diff.toFixed(2)}`}
                </p>
              </div>
              <FiExternalLink
                onClick={() => handleLinkClick(beatmap.beatmapset_id)}
              />
            </InfoContainer>
          </Card>
        ))}
      </CardsContainer>
    </>
  );
};

export default Maps;
