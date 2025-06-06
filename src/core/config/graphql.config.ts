import { ConfigService } from '@nestjs/config';
import type { ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { isDev } from '@/src/shared/utils/is-dev.util';

export function getGraphQlConfig(configService: ConfigService): ApolloDriverConfig {
    return {
        playground: isDev(configService),
        path: configService.getOrThrow<string>('GRAPHQL_PREFIX'),
        autoSchemaFile: join(process.cwd(), 'src/core/graphql/schema.gql'),
        sortSchema: true,
        context: ({ req, res }) => ({ req, res }),
    }
}