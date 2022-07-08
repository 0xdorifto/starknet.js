import {
  CallContractResponse,
  DeclareContractResponse,
  DeployContractResponse,
  EstimateFeeResponse,
  GetBlockResponse,
  GetTransactionReceiptResponse,
  GetTransactionResponse,
  InvokeFunctionResponse,
  RPC,
} from '../../types';
import { ResponseParser } from '.';

export class RPCResponseParser extends ResponseParser {
  public parseGetBlockResponse(res: RPC.GetBlockResponse): GetBlockResponse {
    return {
      accepted_time: res.accepted_time,
      block_hash: res.block_hash,
      block_number: res.block_number,
      gas_price: res.gas_price,
      new_root: res.new_root,
      old_root: res.old_root,
      parent_hash: res.parent_hash,
      sequencer: res.sequencer,
      status: res.status,
      transactions: res.transactions,
    };
  }

  public parseGetTransactionResponse(res: RPC.GetTransactionResponse): GetTransactionResponse {
    return {
      calldata: res.calldata || [],
      contract_address: res.contract_address,
      contract_class: res.contract_class,
      entry_point_selector: res.entry_point_selector,
      max_fee: res.max_fee,
      nonce: res.nonce,
      sender_address: res.sender_address,
      signature: res.signature,
      transaction_hash: res.txn_hash,
      version: res.version,
    };
  }

  public parseGetTransactionReceiptResponse(
    res: RPC.GetTransactionReceiptResponse
  ): GetTransactionReceiptResponse {
    return {
      transaction_hash: res.txn_hash,
      actual_fee: res.actual_fee,
      status: res.status,
      status_data: res.status_data,
      messages_sent: res.messages_sent?.map(({ to_address, payload }) => ({
        to_address,
        payload,
      })),
      l1_origin_message: res.l1_origin_message && {
        from_address: res.l1_origin_message.from_address,
        payload: res.l1_origin_message.payload,
      },
      events: res.events.map(({ from_address, keys, data }) => ({
        from_address,
        keys,
        data,
      })),
    };
  }

  public parseFeeEstimateResponse(res: RPC.EstimateFeeResponse): EstimateFeeResponse {
    return {
      overall_fee: res.overall_fee,
    };
  }

  public parseCallContractResponse(res: Array<string>): CallContractResponse {
    return {
      result: res,
    };
  }

  public parseInvokeFunctionResponse(res: RPC.AddTransactionResponse): InvokeFunctionResponse {
    return {
      transaction_hash: res.transaction_hash,
    };
  }

  public parseDeployContractResponse(res: RPC.DeployContractResponse): DeployContractResponse {
    return {
      transaction_hash: res.transaction_hash,
      contract_address: res.contract_address,
    };
  }

  public parseDeclareContractResponse(res: RPC.DeclareResponse): DeclareContractResponse {
    return {
      transaction_hash: res.transaction_hash,
      class_hash: res.class_hash,
    };
  }
}
