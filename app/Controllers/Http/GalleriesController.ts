import Database from "@ioc:Adonis/Lucid/Database";
import Gallery from "App/Models/Gallery";
import { Request, Response } from "@adonisjs/core/build/standalone";

export default class GalleriesController {
  public async store({
    request,
  }: {
    request: Request;
    response: Response;
  }) {
    const { name, ipfs, traits } = request.body();

    const nftGallery = await Gallery.create({
      name,
      ipfs,
    });

    let nftGalleryId = await nftGallery["$attributes"].id;

    let traitColumns: any = [];
    let traitValues: any = [];

    traits.map(async (trait) => {
      let column = trait.trait_type.replace(" ", "_").toLowerCase().toString();
      traitColumns.push(column);
      traitValues.push(trait.value);
    });

    await Database.rawQuery(
      `
        INSERT INTO metadata
        (id,${traitColumns})
        VALUES
        (${nftGalleryId},${traitValues.map((trait) => `'${trait}'`)})
      `
    );

    return "success";
  }

  public async list({
    request,
  }: {
    request: Request;
    response: Response;
  }) {
    const {
      page, // get number of page
    } = request.params();

    const limit = 12;

    try {
      const GalleyList = await Database.rawQuery(
        `
          SELECT *
          FROM galleries
          INNER JOIN metadata
          ON galleries.id = metadata.id
          ORDER BY galleries.id
          LIMIT ${limit}
          OFFSET ${(page - 1) * limit}
        `
      );

      if (page - 1 > 0) {
        return {
          data: GalleyList.rows,
          next: `http://127.0.0.1:3333/gallery-list/${parseInt(page) + 1}`,
          previews: `http://127.0.0.1:3333/gallery-list/${parseInt(page) - 1}`,
        };
      } else {
        return {
          data: GalleyList.rows,
          next: `http://127.0.0.1:3333/gallery-list/${parseInt(page) + 1}`,
          previews: `http://127.0.0.1:3333/gallery-list/1`,
        };
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  public async updateMetadata({
    request,
  }: {
    request: Request;
    response: Response;
  }) {
    const { ipfs } = request.body();

    await Database.rawQuery(`UPDATE galleries SET ipfs = '${ipfs}'`);

    return "success";
  }
}
