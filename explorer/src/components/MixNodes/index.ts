/* eslint-disable camelcase */
import { MixNodeResponse, MixNodeResponseItem, MixnodeStatus } from '../../typeDefs/explorer-api';

export type MixnodeRowType = {
  id: string;
  status: MixnodeStatus;
  owner: string;
  location: string;
  identity_key: string;
  bond: number;
  self_percentage: string;
  host: string;
  layer: string;
  profit_percentage: string;
  avg_uptime: string;
  stake_saturation: string;
};

export function mixnodeToGridRow(arrayOfMixnodes?: MixNodeResponse): MixnodeRowType[] {
  return (arrayOfMixnodes || []).map(mixNodeResponseItemToMixnodeRowType);
}

export function mixNodeResponseItemToMixnodeRowType(item: MixNodeResponseItem): MixnodeRowType {
  const pledge = Number(item.pledge_amount.amount) || 0;
  const delegations = Number(item.total_delegation.amount) || 0;
  const totalBond = pledge + delegations;
  const selfPercentage = ((pledge * 100) / totalBond).toFixed(2);
  const profitPercentage = item.mix_node.profit_margin_percent || 0;
  const stakeSaturation = item.stake_saturation || '';
  return {
    id: item.owner,
    status: item.status,
    owner: item.owner,
    identity_key: item.mix_node.identity_key || '',
    bond: totalBond || 0,
    location: item?.location?.country_name || '',
    self_percentage: selfPercentage,
    host: item?.mix_node?.host || '',
    layer: item?.layer || '',
    profit_percentage: `${profitPercentage}%`,
    avg_uptime: `${item.avg_uptime}%` || '-',
    stake_saturation: typeof stakeSaturation === 'number' ? `${(stakeSaturation * 100).toFixed(2)} %` : '-',
  };
}
