import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AuthGuard, KeycloakConnectModule } from 'nest-keycloak-connect';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

//_____________________Custom Imports_____________________//
import { CasesModule } from './cases/cases.module';
import { CaseHistoryModule } from './case_history/case_history.module';
import { CaseEventsModule } from './case_events/case_events.module';
import { EventTypesModule } from './event_types/event_types.module';
import { CaseStatusModule } from './case_status/case_status.module';
import { CaseTypesModule } from './case_types/case_types.module';
import { NatsModule } from './nats/nats.module';
import { CaseNotesModule } from './case_notes/case_notes.module';
import { WorkflowActivityModule } from './workflow_activities/workflow_activity.module';

/**
 *  Summary :Keyclock settings
 *  Created By : Akhila U S
 */
const keyCloakOptionsProvider = {
  provide: 'keyCloakDataProvider',
  useFactory: (config: ConfigService) => {
    return {
      authServerUrl: config.get('KEYCLOCK_AUTH_URL'),
      realm: config.get('KEYCLOCK_REALM'),
      clientId: config.get('KEYCLOCK_CLIENT_ID'),
      secret: config.get('KEYCLOCK_SECRET'),
    };
  },
  inject: [ConfigService],
};
/**
 * Summary : App Module Wrapping All Functionality For Case Micro Service
 * Created By : Akhila U S
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CasesModule,
    KeycloakConnectModule.registerAsync(keyCloakOptionsProvider),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      introspection: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('POSTGRESQL_HOST'),
        port: parseInt(config.get('POSTGRESQL_PORT')),
        database: config.get('POSTGRES_DATABASE'),
        username: config.get('POSTGRES_DB_USERNAME'),
        password: config.get('POSTGRES_DB_PASSWORD'),

        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: ['./src/migrations/*.ts'],
      }),
    }),
    CaseHistoryModule,
    CaseEventsModule,
    EventTypesModule,
    CaseStatusModule,
    CaseTypesModule,
    NatsModule,
    CaseNotesModule,
    WorkflowActivityModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD, //For keyclock Auth Token
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
