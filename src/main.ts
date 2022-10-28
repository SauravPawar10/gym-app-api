import { NestFactory } from '@nestjs/core';
import { ServiceAccount } from 'firebase-admin';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { json, urlencoded } from 'body-parser';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const configService: ConfigService = app.get(ConfigService);
  const adminConfig: ServiceAccount = {
    projectId: 'gym-app-e2c5a',
    privateKey:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxjLmxUbeJulXd\nLt3wow8hRaBWW9PwuyHpcS2v6oEKmLmZFQbXG23pvRi3iuB+X2hNNJNB0nlqdig+\n/0vbgB7JjaAvbPG/StSKHlDBa3+swE9Ya5jUekrn3h7Yc464nLaFB61Eu5AME2j4\ntUftmkkEJWljdxFpys9dM8EfxafpDrcF+wgazdsaTPcoRDSoO9TmELk8NNUFSbWX\nKhxd8ye/Io3hXm14wdkt+u0ikWw/jT8tZNhFofWz9v8hEuMJFUl0Zd/qdopOz4+i\nDY2wW0XCZhkDDKdm4TTL49kNY1fntpc0HCtHY4UJHPQcrIOkISxEqldYCR4+sHAR\nFzXQophpAgMBAAECggEABb8BL3zujLWMG9ltc2FDlxcSxli4dj0ILu7rxJq5TGd+\n8jZc/08y8nKdPytucoiR7pW6AlJWfZyPVuKaSONPm8RKn95NwJwiXsn2YRwiiKu8\npabtzkqa7AAjTWwH/W+M9Kc381aCpfFm3022ozjwDgNL8t0ioiLfLSwEnwudkIxM\ng6C5gU32dMISYU4H+lt8vNCUUC/gRKHcM6+HSkOZ5SdlZtdcKlphBb4PmV43oeYT\nxlAqrVlZr/1RKLq98VlcqkhBznqTNE4CsfCHr5R5F0IgsKZiD8KjRt5g5GpJMcYF\n3O5od3VeTDXOQ417+Nmia4Y/2paPprV08Mg5ra949QKBgQDo1MwV13bwCFamDdy7\ndK4hSE7rb5PbFz5oxHu+RFVmuQL/ka4UEbxLOcumwEVREEJue0DskbUq/Heucdt8\nrXEVJhCaZJ2YvA56yZFHMsthY8O0N9iJz/M3u9xAlL/OOX2UdzOeFGvyzvi6/uDe\nZpszz64/rh+IHVgVbEopCNygZwKBgQDDN6wYCbXQyq/QCCESj7Xh7YACFvSvhMe6\ntnhrKRQjqeAAdnYsDgBwnBCyeje1TUKlrioT1Tv3F7FjBl9FCM5TfSxYJGX096Gz\nNQiSRoE06FL7Ft9Mw92Rs37+m0Hwv9F+8QRifPmII63hzwKezZAyflGANSXJJyAm\ntwGeWkg+rwKBgFTGFkDloMKo5pOzfGkshLJNl56Vk6oz/l87GysdylKKjpLrQgzA\noGRreMEQRKzNVMLRUcRRETvDjPgRMK9mn0PqBiWQ+OjBoCwI9EKONgsRvhICO2+C\nLbZfSkShZGz79cN22251VRClV18OqmWPynbE6Vb6WTTAKnAya5YhSeOFAoGBAKUz\nY6sj7Hy4SXfeqT4v51c9yOn7yy0NTIgxCk6FAMn9Y9aAaRh28OBa8bZXvvTqYNAc\nRvdpp8k+f5qxNcYR4ai9cN1WUAGx3WDuLEa863J+eFqLzIQF7Gb0Yy/K6050xTCL\nfY5q/C+9IdTJfgotIy3Xv9ijIUrMlWSt0ezTsfd5AoGAbuls94Gx9Hh38tRMFX1o\nWB/d/wjaZuviQWAP458A/WpepLR0R4cqe2fN94NxWYa6IZajrStyyOsrA7ludO5/\n8jWiiFqXeTD+AcXuGfFlXL0Vwa5dZB/xoTt1YD8MHdKPxkrgiASobdzH++sQTxuc\nR2+sQ179ukbWQvI1sWJm0NQ=\n-----END PRIVATE KEY-----\n',
    clientEmail:
      'firebase-adminsdk-wpkcg@gym-app-e2c5a.iam.gserviceaccount.com',
  };

  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    // databaseURL: "https://xxxxx.firebaseio.com",
  });
  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  await app.listen(3001);
  console.log(
    `Application is running on: ${await app.getUrl()} => ${join(
      __dirname,
      process.platform === 'linux' ? '..' : '.',
      'uploads',
    )}`,
  );
}
bootstrap();
