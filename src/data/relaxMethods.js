export const muscleGroups = [
  {
    id: 'neck',
    name: '颈部',
    icon: 'neck'
  },
  {
    id: 'shoulders',
    name: '肩部',
    icon: 'shoulder'
  },
  {
    id: 'back',
    name: '背部',
    icon: 'backMuscle'
  },
  {
    id: 'chest',
    name: '胸部',
    icon: 'chest'
  },
  {
    id: 'arms',
    name: '手臂',
    icon: 'arm'
  },
  {
    id: 'legs',
    name: '腿部',
    icon: 'leg'
  },
  {
    id: 'glutes',
    name: '臀部',
    icon: 'glutes'
  }
]

export const relaxMethods = [
  {
    id: 'foam-roller-neck',
    title: '泡沫轴放松颈部',
    category: 'foam-roller',
    categoryName: '泡沫轴',
    muscleGroup: 'neck',
    muscleGroupName: '颈部',
    duration: 5,
    description: '使用泡沫轴放松颈部紧张的肌肉，缓解颈部酸痛',
    steps: [
      {
        title: '准备姿势',
        content: '将泡沫轴放置在地面上，躺下使颈部靠在泡沫轴上，双手放在身体两侧。'
      },
      {
        title: '滚动动作',
        content: '缓慢地前后滚动颈部，让泡沫轴从枕骨底部滚动到颈部与肩部连接处。'
      },
      {
        title: '定点按压',
        content: '当找到紧张点时，保持在该位置停留15-20秒，深呼吸放松。'
      },
      {
        title: '注意事项',
        content: '动作要缓慢，不要用力过猛，避免压迫颈椎。'
      }
    ],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20fitness%20illustration%20of%20a%20person%20using%20foam%20roller%20neck%20exercise%20massage%20relaxation&image_size=square'
  },
  {
    id: 'foam-roller-shoulders',
    title: '泡沫轴放松肩部',
    category: 'foam-roller',
    categoryName: '泡沫轴',
    muscleGroup: 'shoulders',
    muscleGroupName: '肩部',
    duration: 5,
    description: '释放肩部肌肉紧张，改善肩关节活动度',
    steps: [
      {
        title: '准备姿势',
        content: '侧卧在泡沫轴上，将泡沫轴放在肩部下方，另一只手放在身体前面保持平衡。'
      },
      {
        title: '滚动动作',
        content: '缓慢滚动泡沫轴，覆盖整个肩部区域，包括斜方肌和三角肌。'
      },
      {
        title: '定点按压',
        content: '在紧张点停留，深呼吸，让肌肉慢慢放松。'
      },
      {
        title: '换边',
        content: '完成一侧后换另一侧重复相同的动作。'
      }
    ],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20fitness%20illustration%20of%20a%20person%20using%20foam%20roller%20shoulder%20exercise%20massage%20relaxation&image_size=square'
  },
  {
    id: 'foam-roller-back',
    title: '泡沫轴放松背部',
    category: 'foam-roller',
    categoryName: '泡沫轴',
    muscleGroup: 'back',
    muscleGroupName: '背部',
    duration: 8,
    description: '放松背部深层肌肉，缓解背部僵硬',
    steps: [
      {
        title: '准备姿势',
        content: '仰卧在泡沫轴上，泡沫轴位于背部下方，膝盖弯曲，双脚平放在地面。'
      },
      {
        title: '滚动动作',
        content: '双手放在脑后或胸前，缓慢上下滚动背部。'
      },
      {
        title: '覆盖范围',
        content: '从胸椎到腰椎区域，注意不要滚动到骶骨和颈椎。'
      },
      {
        title: '定点放松',
        content: '在紧张区域停留，深呼吸放松。'
      }
    ],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20fitness%20illustration%20of%20a%20person%20using%20foam%20roller%20back%20exercise%20massage%20relaxation&image_size=square'
  },
  {
    id: 'foam-roller-legs',
    title: '泡沫轴放松腿部',
    category: 'foam-roller',
    categoryName: '泡沫轴',
    muscleGroup: 'legs',
    muscleGroupName: '腿部',
    duration: 8,
    description: '放松大腿和小腿肌肉，预防运动损伤',
    steps: [
      {
        title: '大腿前侧',
        content: '俯卧，将泡沫轴放在大腿前侧，双手支撑地面，缓慢滚动。'
      },
      {
        title: '大腿后侧',
        content: '坐姿，将泡沫轴放在大腿后侧，双手支撑身体，缓慢滚动。'
      },
      {
        title: '小腿',
        content: '坐姿，将泡沫轴放在小腿下方，另一条腿放在上面增加压力，缓慢滚动。'
      },
      {
        title: '定点按压',
        content: '每个区域找到紧张点后停留放松。'
      }
    ],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20fitness%20illustration%20of%20a%20person%20using%20foam%20roller%20leg%20exercise%20massage%20relaxation&image_size=square'
  },
  {
    id: 'foam-roller-glutes',
    title: '泡沫轴放松臀部',
    category: 'foam-roller',
    categoryName: '泡沫轴',
    muscleGroup: 'glutes',
    muscleGroupName: '臀部',
    duration: 6,
    description: '放松臀大肌和臀中肌，改善臀部血液循环',
    steps: [
      {
        title: '准备姿势',
        content: '坐姿，将泡沫轴放在臀部下方，双手支撑地面。'
      },
      {
        title: '滚动动作',
        content: '缓慢滚动整个臀部区域，可以将身体重心左右移动。'
      },
      {
        title: '深度放松',
        content: '可以将一条腿交叉放在另一条腿上，增加压力。'
      },
      {
        title: '换边',
        content: '两侧臀部都要充分放松。'
      }
    ],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20fitness%20illustration%20of%20a%20person%20using%20foam%20roller%20glutes%20exercise%20massage%20relaxation&image_size=square'
  },
  {
    id: 'massage-gun-shoulders',
    title: '筋膜枪放松肩部',
    category: 'massage-gun',
    categoryName: '筋膜枪',
    muscleGroup: 'shoulders',
    muscleGroupName: '肩部',
    duration: 5,
    description: '使用筋膜枪深层放松肩部肌肉',
    steps: [
      {
        title: '选择档位',
        content: '开始使用低速档位，适应后可根据感觉调整。'
      },
      {
        title: '按摩部位',
        content: '针对斜方肌、三角肌前中后束分别按摩。'
      },
      {
        title: '按摩方式',
        content: '在每个部位停留15-20秒，缓慢移动筋膜枪。'
      },
      {
        title: '注意事项',
        content: '避免直接按压骨骼和关节部位。'
      }
    ],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20fitness%20illustration%20of%20a%20person%20using%20massage%20gun%20shoulder%20exercise%20massage%20relaxation&image_size=square'
  },
  {
    id: 'massage-gun-back',
    title: '筋膜枪放松背部',
    category: 'massage-gun',
    categoryName: '筋膜枪',
    muscleGroup: 'back',
    muscleGroupName: '背部',
    duration: 7,
    description: '缓解背部肌肉紧张和酸痛',
    steps: [
      {
        title: '选择按摩头',
        content: '使用球形按摩头适合大面积肌肉。'
      },
      {
        title: '上背部',
        content: '按摩斜方肌和菱形肌区域，沿着肌肉纤维方向移动。'
      },
      {
        title: '下背部',
        content: '按摩竖脊肌区域，注意避开脊柱。'
      },
      {
        title: '压力调整',
        content: '保持适中压力，让筋膜枪自然移动。'
      }
    ],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20fitness%20illustration%20of%20a%20person%20using%20massage%20gun%20back%20exercise%20massage%20relaxation&image_size=square'
  },
  {
    id: 'massage-gun-legs',
    title: '筋膜枪放松腿部',
    category: 'massage-gun',
    categoryName: '筋膜枪',
    muscleGroup: 'legs',
    muscleGroupName: '腿部',
    duration: 8,
    description: '放松腿部肌肉，促进乳酸代谢',
    steps: [
      {
        title: '大腿前侧',
        content: '按摩股四头肌，从上到下缓慢移动。'
      },
      {
        title: '大腿后侧',
        content: '按摩腘绳肌，注意避开腘窝区域。'
      },
      {
        title: '小腿',
        content: '按摩腓肠肌和比目鱼肌，每个部位充分按摩。'
      },
      {
        title: '重点区域',
        content: '在肌肉紧张点可以适当增加停留时间。'
      }
    ],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20fitness%20illustration%20of%20a%20person%20using%20massage%20gun%20leg%20exercise%20massage%20relaxation&image_size=square'
  }
]

export function getRelaxMethodsByMuscleGroup(muscleGroupId) {
  return relaxMethods.filter(m => m.muscleGroup === muscleGroupId)
}

export function getRelaxMethodById(id) {
  return relaxMethods.find(m => m.id === id)
}
