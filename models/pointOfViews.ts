export enum pointOfViews{
    first = 1,
    second = 2,
    third = 3,
    formalYou = 4,
    we = 5
}

export const pointOfViewLabels = new Map<number, string>([
    [pointOfViews.first, 'First person'],
    [pointOfViews.second, 'Second person'],
    [pointOfViews.third, 'Third person'],
    [pointOfViews.formalYou, 'Usted'],
    [pointOfViews.we, 'Nosotros']
  ]);