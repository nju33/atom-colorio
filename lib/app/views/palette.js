'use babel';

import html from 'choo/html';
import section from './section';

export default function (state, prev, send) {
  return html`
    <div>
      ${section(state, prev, send, {
        headline: 'Original',
        prop: 'original',
        inline: true,
        slider: false
      })}

      ${section(state, prev, send, {
        headline: 'Complementary',
        prop: 'complementColor',
        inline: true,
        slider: false
      })}

      ${section(state, prev, send, {
        headline: 'Greyscale',
        prop: 'greyscaleColor',
        inline: true,
        slider: false
      })}

      ${section(state, prev, send, {
        headline: 'Split Complementary',
        prop: 'splitComplementColors',
        slider: false
      })}

      ${section(state, prev, send, {
        headline: 'Analogous',
        prop: 'analogousColors',
        slider: false
      })}

      ${section(state, prev, send, {
        headline: 'monochromatic',
        prop: 'monochromaticColors',
        slider: false
      })}

      ${section(state, prev, send, {
        headline: 'Triadic',
        prop: 'triadicColors',
        slider: false
      })}

      ${section(state, prev, send, {
        headline: 'Tetradic',
        prop: 'tetradicColors',
        slider: false
      })}

      ${section(state, prev, send, {
        headline: 'Lighten',
        prop: 'lightenColors',
        slider: true
      })}

      ${section(state, prev, send, {
        headline: 'Darken',
        prop: 'darkenColors',
        slider: true
      })}

      ${section(state, prev, send, {
        headline: 'Saturate',
        prop: 'saturateColors',
        slider: true
      })}

      ${section(state, prev, send, {
        headline: 'Desaturate',
        prop: 'desaturateColors',
        slider: true
      })}
    </div>
  `;
}
