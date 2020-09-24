import { IInitProps } from '@via-profit-services/core';
interface IProps {
    typeDefs: IInitProps['typeDefs'];
    resolvers: IInitProps['resolvers'];
}
declare const configureApp: (props?: IProps) => IInitProps;
export default configureApp;
export { configureApp };
