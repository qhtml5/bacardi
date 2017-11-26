/**
 * Copyright (c) 2017 The Bacardi Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as file from 'generator/base/file';
import {Parser} from 'generator/new_parser/parser';

async function processIDL(idlFilePath: string): Promise<void> {
  const idlFragment: string = await file.read(idlFilePath);
  await Parser.parse(idlFragment);
}

export async function run(idlFilePaths: string[]): Promise<number> {
  const readIDLFileTasks: Promise<void>[] = [];
  idlFilePaths.forEach((idlFilePath) => {
    readIDLFileTasks.push(processIDL(idlFilePath));
  });

  try {
    await Promise.all(readIDLFileTasks);
  } catch (e) {
    return e;
  }

  return 0;
}
