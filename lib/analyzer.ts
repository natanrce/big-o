import * as swc from '@swc/core';
import { Complexity } from './enum/complexity';

type LoopWithCondition = 
  swc.ForStatement | 
  swc.WhileStatement | 
  swc.DoWhileStatement

type LoopWithoutCondition =
  swc.ForInStatement |
  swc.ForOfStatement

interface StatementComplexity {
  complexity: Complexity;
}

export class Analyzer {
  private functions = new Map<string, StatementComplexity>();
  private loops = new Map<string, StatementComplexity>();

  constructor(
    private readonly src: string,
    private readonly options?: swc.ParseOptions
  ) {}

  public async process() {
    const module = await swc.parse(this.src, this.options);
    this.#transverseAST(module);

    return [
      ...this.loops.values(),
      ...this.functions.values()
    ]
  }

  public processSync() {
    const module = swc.parseSync(this.src, this.options);
    this.#transverseAST(module);

    return [
      ...this.loops.values(),
      ...this.functions.values()
    ]
  }

  #transverseAST(node: swc.ModuleItem) {
    const hooks = {
      ForStatement: this.#handleLoopDeclaration,
      WhileStatement: this.#handleLoopDeclaration,
      DoWhileStatement: this.#handleLoopDeclaration,
      FunctionDeclaration: this.#handleFunctionDeclaration
    }
    
    hooks[node?.type]?.call(this, node)

    for (const key in node) {
      if (node[key] && typeof node[key] !== 'object') continue;
      this.#transverseAST(node[key]);
    }
  }

  #handleLoopDeclaration<T extends LoopWithCondition>(node: T) {
    let nestedLoops = 0;  

    function visitNested(subNode: T) {
      if (
        subNode.type === 'ForStatement' || 
        subNode.type === 'WhileStatement' || 
        subNode.type === 'DoWhileStatement'
      ) {
        nestedLoops++;
      }

      for (const key in subNode) {
        if (subNode[key] && typeof subNode[key] === 'object') {
          visitNested(subNode[key] as T);
        }
      }
    }

    visitNested(node.body);

    this.loops.set(`${node.type}-${nestedLoops}`, {
      complexity: nestedLoops >= 1 
        ? Complexity.QUADRATIC 
        : Complexity.LINEAR
    })   
  }

  #handleFunctionDeclaration(node: swc.FunctionDeclaration) {
    function getFunctionCalls(
      subNode: swc.OptionalChainingCall,
      callStack: string[] = []
    ) {
      if (subNode.type === 'CallExpression') {
        const calleeName = subNode.callee.value || subNode.callee.object.value;

        if (calleeName === node.identifier.value) {
          callStack.push(calleeName);
        }
      }

      for (const key in subNode) {
        if (subNode[key] && typeof subNode[key] === 'object') {
          getFunctionCalls(subNode[key], callStack);
        }
      }

      return callStack;
    }

    const callStack = getFunctionCalls(node as unknown as swc.OptionalChainingCall);

    this.functions.set(node.identifier.value,{
      complexity: callStack.length > 1 
        ? Complexity.EXPONENTIAL 
        : Complexity.LINEAR
    });
  }
}