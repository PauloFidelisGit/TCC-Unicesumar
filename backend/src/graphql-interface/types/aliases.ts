import {
	GraphQLBoolean,
	GraphQLFloat,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLString
} from "graphql";

export const NonNullInt = { type: new GraphQLNonNull(GraphQLInt) };
export const NonNullString = { type: new GraphQLNonNull(GraphQLString) };
export const NonNullStringList = {
  type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
};
export const Boolean = { type: GraphQLBoolean };
export const String = { type: GraphQLString };
export const Int = { type: GraphQLInt };
export const ArrayString = { type: new GraphQLList(GraphQLString) };
export const Float = { type: GraphQLFloat };
export const NonNullFloat = { type: new GraphQLNonNull(GraphQLFloat) };
