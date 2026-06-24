import type { Schema, Struct } from '@strapi/strapi';

export interface MueblesVarianteColor extends Struct.ComponentSchema {
  collectionName: 'components_muebles_variante_colors';
  info: {
    displayName: 'VarianteColor';
  };
  attributes: {
    imagen: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    tela: Schema.Attribute.Relation<'oneToOne', 'api::tela.tela'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'muebles.variante-color': MueblesVarianteColor;
    }
  }
}
