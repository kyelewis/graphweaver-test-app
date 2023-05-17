import { Arg, ID, Resolver, Query, ObjectType, Field } from "type-graphql";
import { RelationshipField, GraphqlEntityType } from "@exogee/graphweaver";

export interface createContentfulSearchOptions {
  articleEntity: () => any;
}

export const createContentfulSearch = ({
  articleEntity,
}: CreateContentfulSearchOptions) => {
  @ObjectType()
  class ContentfulSearchResult {
 
    @Field(() => ID)
    id!: string;

    @Field(() => String)
    type!: string;

    // @todo to avoid the dataEntity hack below, perhaps we can add a `plainEntity` boolean to RelationshipField options that doesn't use dataEntity
    @RelationshipField<any>(articleEntity, { id: "articleId", nullable: true })
    article?: any;
  }

  @Resolver()
  class ContentfulSearchResolver {
    @Query(() => [ContentfulSearchResult])
    async contentfulSearch(@Arg("query", () => String) query: string) {
      // @todo actually do a search
      return [
        {
          id: '2eBM47sWGNfeuiEE5B64MF',
          type: "Article",
          dataEntity: { articleId: '2eBM47sWGNfeuiEE5B64MF' },
        } 
      ];
    }
  }

  return ContentfulSearchResolver;
};
