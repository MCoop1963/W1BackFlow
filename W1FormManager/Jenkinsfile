node('docker') {
  checkout scm
  gitCommit = sh(returnStdout: true, script: 'git rev-parse --short --verify HEAD').trim()
  nodeVersion = readFile('.node-version').trim()
  nodeImage = docker.image("node:${nodeVersion}-stretch")

  gitlabBuilds(builds: ["fetch deps", "build", "test"]) {
    stage("fetch deps") {
      gitlabCommitStatus("fetch deps") {
        nodeImage.inside {
          sh 'yarn install'
        }
      }
    }

    stage("build") {
      gitlabCommitStatus("build") {
        nodeImage.inside("-e CI=true") {
          sh 'yarn build'
        }
      }
    }

    stage("test") {
      gitlabCommitStatus("test") {
        nodeImage.inside("-e CI=true") {
          sh 'yarn test'
        }
      }
    }
  }
}
