import { Beatmap } from '../interfaces/IBeatmap';

function convertProperty(keyword: string) {
  if (keyword === 'bpm') return 'bpm';
  if (keyword === 'length') return 'total_length';
  if (keyword === 'stars') return 'difficultyrating';
  if (keyword === 'keys') return 'diff_size';
  return 'bpm';
}

export function filterBeatmap(word: string, beatmap: Beatmap): boolean | null {
  const keywords = ['bpm', 'length', 'keys', 'stars', 'slider%', 'hitobjects'];
  const operators = ['>=', '<=', '>', '<', '='];

  if (
    !word.match(
      /(length|bpm|stars|keys|slider%|hitobjects)(<|>|>=|<=|=)(\d+(\.\d{1,2})?)/gi,
    )
  ) {
    return null;
  }

  const [operator] = operators.filter((_operator: string) =>
    word.includes(_operator),
  );

  const keyword = keywords
    .filter((_keyword: string) => word.toLowerCase().includes(_keyword))[0]
    .toLowerCase();
  const value = Number(word.split(operator)[1]);
  switch (operator) {
    case '>': {
      if (keyword === 'slider%')
        return (
          (beatmap.count_slider /
            (beatmap.count_normal +
              beatmap.count_slider +
              beatmap.count_spinner)) *
            100 >
          value
        );
      if (keyword === 'hitobjects')
        return (
          beatmap.count_normal + beatmap.count_slider + beatmap.count_spinner >
          value
        );
      return beatmap[convertProperty(keyword)] > value;
    }
    case '<': {
      if (keyword === 'slider%')
        return (
          (beatmap.count_slider /
            (beatmap.count_normal +
              beatmap.count_slider +
              beatmap.count_spinner)) *
            100 <
          value
        );
      if (keyword === 'hitobjects')
        return (
          beatmap.count_normal + beatmap.count_slider + beatmap.count_spinner <
          value
        );
      return beatmap[convertProperty(keyword)] < value;
    }
    case '<=': {
      if (keyword === 'slider%')
        return (
          (beatmap.count_slider /
            (beatmap.count_normal +
              beatmap.count_slider +
              beatmap.count_spinner)) *
            100 <=
          value
        );
      if (keyword === 'hitobjects')
        return (
          beatmap.count_normal + beatmap.count_slider + beatmap.count_spinner <=
          value
        );
      return beatmap[convertProperty(keyword)] <= value;
    }
    case '>=': {
      if (keyword === 'slider%')
        return (
          (beatmap.count_slider /
            (beatmap.count_normal +
              beatmap.count_slider +
              beatmap.count_spinner)) *
            100 >=
          value
        );
      if (keyword === 'hitobjects')
        return (
          beatmap.count_normal + beatmap.count_slider + beatmap.count_spinner >=
          value
        );
      return beatmap[convertProperty(keyword)] >= value;
    }
    case '=': {
      if (keyword === 'slider%')
        return (
          (beatmap.count_slider /
            (beatmap.count_normal +
              beatmap.count_slider +
              beatmap.count_spinner)) *
            100 ===
          value
        );
      if (keyword === 'hitobjects')
        return (
          beatmap.count_normal +
            beatmap.count_slider +
            beatmap.count_spinner ===
          value
        );
      return beatmap[convertProperty(keyword)] === value;
    }
  }
  return null;
}
