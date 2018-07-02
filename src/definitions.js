const barchartProperties = {
  qInfo: {
    qType: "visualization",
    qId: ""
  },
  type: "my-chart",
  labels: true,
  qHyperCubeDef: {
    qDimensions: [
      {
        qDef: {
          qFieldDefs: ["sentiment"],
          qSortCriterias: [
            {
              qSortByAscii: 1
            }
          ]
        }
      }
    ],
    qMeasures: [
      {
        qDef: {
          qDef: "Count([sentiment])"
        },
        qSortBy: {
          qSortByNumeric: -1
        }
      }
    ],
    qInterColumnSortOrder: [1, 0],
    qInitialDataFetch: [
      {
        qTop: 0,
        qHeight: 500,
        qLeft: 0,
        qWidth: 17
      }
    ],
    qSuppressZero: false,
    qSuppressMissing: true
  }
};

const tweets = {
  qInfo: {
    qType: "listbox"
  },
  qListObjectDef: {
    qDef: {
      qFieldLabels: [],
      qFieldDefs: ["text"],
      autoSort: true,
      qSortCriterias: [
        {
          qExpression: {},
          qSortByLoadOrder: 1,
          qSortByNumeric: -1,
          qSortByState: 1
        }
      ]
    },
    qShowAlternatives: true,
    qInitialDataFetch: [
      {
        qTop: 0,
        qLeft: 0,
        qWidth: 0,
        qHeight: 10000
      }
    ]
  }
};
export { barchartProperties, tweets };
