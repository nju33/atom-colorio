'use babel';

import html from 'choo/html';
import section from './section';

export default function (state, prev, send) {
  return html`
    <div>
      ${section(state, prev, send, {
        headline: 'Original',
        prop: 'original',
        inline: true
      })}

      ${section(state, prev, send, {
        headline: 'Complementary',
        prop: 'complementColor',
        inline: true
      })}

      ${section(state, prev, send, {
        headline: 'Greyscale',
        prop: 'greyscaleColor',
        inline: true
      })}

      ${section(state, prev, send, {
        headline: 'Split Complementary',
        prop: 'splitComplementColors'
      })}

      ${section(state, prev, send, {
        headline: 'Analogous',
        prop: 'analogousColors'
      })}

      ${section(state, prev, send, {
        headline: 'monochromatic',
        prop: 'monochromaticColors'
      })}

      ${section(state, prev, send, {
        headline: 'Triadic',
        prop: 'triadicColors'
      })}

      ${section(state, prev, send, {
        headline: 'Tetradic',
        prop: 'tetradicColors'
      })}

      ${section(state, prev, send, {
        headline: 'Lighten',
        prop: 'lightenColors'
      })}

      ${section(state, prev, send, {
        headline: 'Darken',
        prop: 'darkenColors'
      })}
    </div>
  `;
}
